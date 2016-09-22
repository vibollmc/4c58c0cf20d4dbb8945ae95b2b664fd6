import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HotelModule } from './app/hotel.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(HotelModule);