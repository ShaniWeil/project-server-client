import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ServiceService } from '../services/service.service';

export const managerGuard: CanActivateFn = (route, state) => {
  
  const service = inject(ServiceService);

  return service.isManager;
};
