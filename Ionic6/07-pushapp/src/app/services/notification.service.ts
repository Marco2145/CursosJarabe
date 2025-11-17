import { Injectable, signal } from '@angular/core';
import { Capacitor, CapacitorHttp, HttpResponse } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Browser } from '@capacitor/browser';

import moment from 'moment-timezone';

import { INotification } from '../models/notification.model';
import { environment } from 'src/environments/environment.prod';

import OneSignal, { OSNotification } from 'onesignal-cordova-plugin';

const ONE_SIGNAL_API_URL = 'https://onesignal.com/api/v1/notifications';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  latestForegroundNotification = signal<OSNotification | null>(null);
  latestClickedNotification = signal<OSNotification | null>(null);

  init() {
    const isNotificationsAvailable =
      Capacitor.isPluginAvailable('PushNotifications');

    if (isNotificationsAvailable) {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive) {
          OneSignal.initialize(environment.oneSignalID);

          OneSignal.Notifications.addEventListener(
            'click',
            async (notiClickEvent) => {
              const notification: OSNotification = notiClickEvent.notification;

              console.log('clicked', JSON.stringify(notification));
              this.latestClickedNotification.set(notification);

              // Ejemplo para en caso de recibir una url, abrirla
              if ((notification.additionalData as any)['url']) {
                await Browser.open({
                  url: (notification.additionalData as any)['url'],
                });
              }
            }
          );

          OneSignal.Notifications.addEventListener(
            'foregroundWillDisplay',
            (notificationWillDisplayEvent) => {
              const notification =
                notificationWillDisplayEvent.getNotification();

              console.log(
                'foregroundWillDisplay',
                JSON.stringify(notification)
              );
              this.latestForegroundNotification.set(notification);
            }
          );
        }
      });
    } else {
      console.warn('pushnotification plugin not available');
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
        // Receptor de la notificacion, en este caso es todos
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
      console.log('sent notification, server response', response);
      // Post suele ser 200, pero con el capacitor, tambien es 200
      return response.status === 200;
    });
  }
}
