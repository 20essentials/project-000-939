import { d as decodeKey } from './chunks/astro/server_CksGDp0B.mjs';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Cm8ocQGJ.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/amoil/Desktop/939/","cacheDir":"file:///C:/Users/amoil/Desktop/939/node_modules/.astro/","outDir":"file:///C:/Users/amoil/Desktop/939/dist/","srcDir":"file:///C:/Users/amoil/Desktop/939/src/","publicDir":"file:///C:/Users/amoil/Desktop/939/public/","buildClientDir":"file:///C:/Users/amoil/Desktop/939/dist/client/","buildServerDir":"file:///C:/Users/amoil/Desktop/939/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.7.6_rollup@4.40.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/auth/[...auth]","pattern":"^\\/api\\/auth(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"...auth","dynamic":true,"spread":true}]],"params":["...auth"],"component":"node_modules/.pnpm/auth-astro@4.2.0_@auth+core_beb267d8f916ee423b8391cee9b79996/node_modules/auth-astro/src/api/[...auth].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.cPPnkASS.css"},{"type":"external","src":"/_astro/index.BgMyNPNl.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/amoil/Desktop/939/src/components/Title.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/amoil/Desktop/939/src/components/Hero.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/amoil/Desktop/939/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/amoil/Desktop/939/src/components/Wallpapers.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/.pnpm/auth-astro@4.2.0_@auth+core_beb267d8f916ee423b8391cee9b79996/node_modules/auth-astro/src/api/[...auth]@_@ts":"pages/api/auth/_---auth_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.7.6_rollup@4.40.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-renderers":"renderers.mjs","C:/Users/amoil/Desktop/939/node_modules/.pnpm/astro@5.7.6_rollup@4.40.1_typescript@5.8.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_dQhvPQFG.mjs","\u0000@astrojs-manifest":"manifest_BoiCTR6A.mjs","C:/Users/amoil/Desktop/939/src/components/Wallpapers.astro?astro&type=script&index=0&lang.ts":"_astro/Wallpapers.astro_astro_type_script_index_0_lang.CJ1KLRys.js","C:/Users/amoil/Desktop/939/src/components/ButtonTwitch.astro?astro&type=script&index=0&lang.ts":"_astro/ButtonTwitch.astro_astro_type_script_index_0_lang.DeMVFwEN.js","C:/Users/amoil/Desktop/939/src/components/LogoutButton.astro?astro&type=script&index=0&lang.ts":"_astro/LogoutButton.astro_astro_type_script_index_0_lang.Bt-b0qBz.js","C:/Users/amoil/Desktop/939/node_modules/.pnpm/astro@5.7.6_rollup@4.40.1_typescript@5.8.3/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.BZs-2RF_.js","C:/Users/amoil/Desktop/939/node_modules/.pnpm/photoswipe@5.4.4/node_modules/photoswipe/dist/photoswipe.esm.js":"_astro/photoswipe.esm.BxGa2pwP.js","C:/Users/amoil/Desktop/939/node_modules/.pnpm/auth-astro@4.2.0_@auth+core_beb267d8f916ee423b8391cee9b79996/node_modules/auth-astro/client.ts":"_astro/client.BqElmF-z.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.BgMyNPNl.css","/assets/AnotherDanger.otf","/assets/favicon.webp","/assets/w1.avif","/assets/w10.avif","/assets/w11.avif","/assets/w12.avif","/assets/w13.avif","/assets/w14.avif","/assets/w15.avif","/assets/w16.avif","/assets/w17.avif","/assets/w18.avif","/assets/w19.avif","/assets/w2.avif","/assets/w20.avif","/assets/w3.avif","/assets/w4.avif","/assets/w5.avif","/assets/w6.avif","/assets/w7.avif","/assets/w8.avif","/assets/w9.avif","/assets/wallpaper.png","/_astro/ButtonTwitch.astro_astro_type_script_index_0_lang.DeMVFwEN.js","/_astro/client.BqElmF-z.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.BZs-2RF_.js","/_astro/index.cPPnkASS.css","/_astro/LogoutButton.astro_astro_type_script_index_0_lang.Bt-b0qBz.js","/_astro/photoswipe.esm.BxGa2pwP.js","/_astro/preload-helper.BlTxHScW.js","/_astro/Wallpapers.astro_astro_type_script_index_0_lang.CJ1KLRys.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"QUUJxQG9IBNJMoHqN6vc3wPGT5hZ+t11kXIeXh7gH1U="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
