import EntryPlayerListEvent from './EntryPlayerListEvent';
import { IEntryPlayerListEventSubscriber } from './IEntryPlayerListEventSubscriber';

export default class EntryPlayerListEventPublisher {
  public subscribers: IEntryPlayerListEventSubscriber[];

  public subscribe(subscriber: IEntryPlayerListEventSubscriber): void {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: IEntryPlayerListEventSubscriber): void {
    this.subscribers = this.subscribers.filter(
      (_subscriber) => _subscriber === subscriber,
    );
  }

  public publish(event: EntryPlayerListEvent): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.handle(event);
    });
  }

  public constructor() {
    this.subscribers = [];
  }
}
