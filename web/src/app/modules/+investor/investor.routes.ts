import { InvestorComponent } from './components/investor/investor.component';
import { StartupListComponent } from './components/startupList/startupList.component';

export const routes = [
  { path: '', component: StartupListComponent},
  { path: 'startup/:id', component: InvestorComponent}
];
