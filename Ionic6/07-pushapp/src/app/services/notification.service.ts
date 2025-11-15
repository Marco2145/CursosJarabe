import { Injectable } from '@angular/core';
import { Capacitor, CapacitorHttp, HttpResponse } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Browser } from '@capacitor/browser';

import moment from 'moment-timezone';

import { INotification } from '../models/notification.model';
import { environment } from 'src/environments/environment.prod';

import OneSignal from 'onesignal-cordova-plugin';

const ONE_SIGNAL_API_URL = 'https://onesignal.com/api/v1/notifications';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  init() {
    const isNotificationsAvailable =
      Capacitor.isPluginAvailable('PushNotifications');

    if (isNotificationsAvailable) {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive) {
          OneSignal.initialize(environment.oneSignalID);

          OneSignal.Notifications.addEventListener('click', async (e) => {
            const notification: any = e.notification;

            console.log(notification);

            // Ejemplo para en caso de recibir una url, abrirla
            if (notification.additionalData['url']) {
              await Browser.open({ url: notification.additionalData['url'] });
            }
          });
        }
      });
    }
  }

  sendNotification(notification: INotification) {
    const userTimezone = moment.tz.guess();

    // Aquí usé CapacitorHttp en lugar del HttpClient de angular porque así lo mostró el video y
    // quise ver la alternativa
    return CapacitorHttp.post({
      url: ONE_SIGNAL_API_URL,
      params: {},
      data: {
        app_id: environment.oneSignalID,
        // Receptor de la notificacion
        included_segments: ['Total Subscriptions'],
        // Titulo de la notificacion, puede ir en varios idiomas
        headings: { en: notification.title },
        // Contenido de la notificación
        contents: { en: notification.body },
        // Información que se le quiera enviar, puede ser lo que quiera
        data: { url: notification.url },
        // No es necesario, dirve para programar notificaciones, a partir de una fecha indicada
        // Tiene un formato específico
        send_after: moment(notification.date)
          .tz(userTimezone)
          .format('YYYY-MM-DD HH:mm:ss [GMT]Z'),
      },
      headers: {
        'Content-type': 'application/json',
        Authorization: `Basic ${environment.oneSignalRestApi}`,
      },
      // Response de Capacitor Core
    }).then((response: HttpResponse) => {
      console.log(response);
      // Post suele ser 200, pero con el capacitor, tambien es 200
      return response.status === 200;
    });
  }
}
