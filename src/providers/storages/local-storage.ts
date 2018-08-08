import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of';
import {_throw as observableThrow} from 'rxjs/observable/throw';

@Injectable()
export class LocalStorageProvider {

  /**
   * Gets an item value in local storage
   * @param key The item's key
   * @returns The item's value if the key exists, null otherwise, wrapped in an RxJS Observable
   */
  getItem<T = any>(key: string): Observable<T | null> {
    const unparsedData = localStorage.getItem(key);
    let parsedData: T | null = null;
    if (unparsedData != null) {
      try {
        parsedData = JSON.parse(unparsedData);
      } catch (error) {
        return observableThrow(new Error(`Invalid data in localStorage.`));
      }
    }

    return observableOf(parsedData);
  }

  /**
   * Sets an item in local storage
   * @param key The item's key
   * @param data The item's value, must NOT be null or undefined
   * @returns An RxJS Observable to wait the end of the operation
   */
  setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
    return observableOf(true);
  }

  /**
   * Deletes an item in local storage
   * @param key The item's key
   * @returns An RxJS Observable to wait the end of the operation
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
    return observableOf(true);
  }

  /**
   * Deletes all items from local storage
   * @returns An RxJS Observable to wait the end of the operation
   */
  clear() {
    localStorage.clear();
    return observableOf(true);
  }

}
