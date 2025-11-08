/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect } from "react";
import { Viewer } from "@itwin/web-viewer-react";
import { authClient } from "./common/AuthorizationClient";
import { mapLayerOptions, tileAdminOptions } from "./common/MapLayerOptions";
import { BgMapWidgetProvider } from "./BgMapWidget";
import { MapLayersWidgetProvider } from "./MapLayersWidget";
import { MapLayersUI, MapLayersUiItemsProvider } from "@itwin/map-layers";
import { useViewportOptions } from "./ViewSetup";

const iTwinId = process.env.IMJS_ITWIN_ID;
const iModelId = process.env.IMJS_IMODEL_ID;

const ViewportFrontstageApp = () => {
  const viewportOptions = useViewportOptions();

  /** Sign-in */
  useEffect(() => {
    void authClient.signIn();
    void MapLayersUI.initialize({});
  }, []);

  /** The sample's render method */
  return <Viewer
    iTwinId={iTwinId ?? ""}
    iModelId={iModelId ?? ""}
    authClient={authClient}
    viewportOptions={viewportOptions}
    mapLayerOptions={mapLayerOptions}
    enablePerformanceMonitors={false}
    tileAdmin={tileAdminOptions}
    defaultUiConfig={{
      hideStatusBar: true,
      hideToolSettings: false,
      hideNavigationAid: false
    }}
    uiProviders={[
      new BgMapWidgetProvider(),
      new MapLayersWidgetProvider(), 
      new MapLayersUiItemsProvider(),
      ]}
    theme={process.env.THEME ?? "dark"}
  
  />;
};

export default ViewportFrontstageApp;
