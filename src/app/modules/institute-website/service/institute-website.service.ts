import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { HttpService } from '../../../common/services/http.service';
import { ENDPOINTS } from './api.collection';

export interface WebsiteConfig {
  id: number;
  instituteName: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  subdomain: string | null;
  customDomain: string | null;
  templateId: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageMeta {
  pageName: string;
  displayName: string;
  icon: string;
  isPublished: boolean;
  updatedAt: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class InstituteWebsiteService {

  constructor(private httpService: HttpService) { }

  // ---------------------------------------------------------
  // Config & Branding
  // ---------------------------------------------------------

  getConfig(): Observable<WebsiteConfig> {
    return this.httpService.get(ENDPOINTS.INSTITUTE_WEBSITE, undefined, false, true).pipe(
      map((res: any) => res.data)
    );
  }

  updateConfig(data: Partial<WebsiteConfig>): Observable<WebsiteConfig> {
    return this.httpService.put(ENDPOINTS.INSTITUTE_WEBSITE, data, false, true).pipe(
      map((res: any) => res.data)
    );
  }

  toggleLive(): Observable<{ isPublished: boolean }> {
    return this.httpService.post(ENDPOINTS.INSTITUTE_WEBSITE + '/toggle-live', {}, false, false).pipe(
      map((res: any) => res?.data ?? res)
    );
  }

  // ---------------------------------------------------------
  // Templates
  // ---------------------------------------------------------

  getTemplates(): Observable<any[]> {
    return this.httpService.get(ENDPOINTS.INSTITUTE_WEBSITE + '/templates', undefined, false, true).pipe(
      map((res: any) => res.data)
    );
  }

  getTemplateById(id: number): Observable<any> {
    return this.httpService.get(ENDPOINTS.INSTITUTE_WEBSITE + `/templates/${id}`, undefined, false, true).pipe(
      map((res: any) => res.data)
    );
  }

  // ---------------------------------------------------------
  // Pages Meta
  // ---------------------------------------------------------

  getAllPages(): Observable<PageMeta[]> {
    return this.httpService.get(ENDPOINTS.PAGES, undefined, false, true).pipe(
      map((res: any) => res.data)
    );
  }

  togglePagePublished(slug: string, isPublished: boolean): Observable<{ isPublished: boolean }> {
    return this.httpService.put(`${ENDPOINTS.PAGES}/${slug}/published`, { isPublished }, false, true).pipe(
      map((res: any) => res.data)
    );
  }

  // ---------------------------------------------------------
  // Page Content
  // ---------------------------------------------------------

  getPageContent(slug: string): Observable<any> {
    return this.httpService.get(`${ENDPOINTS.PAGES}/${slug}`, undefined, false, true).pipe(
      map((res: any) => res.data?.content || {})
    );
  }

  updatePageContent(slug: string, content: any): Observable<any> {
    return this.httpService.put(`${ENDPOINTS.PAGES}/${slug}`, content, false, true).pipe(
      map((res: any) => res.data?.content || {})
    );
  }
}
