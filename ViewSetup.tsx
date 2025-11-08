
import { IModelConnection, StandardViewId, ViewCreator3d, ViewState3d } from "@itwin/core-frontend";
import { Point3d, Vector3d, YawPitchRollAngles } from "@itwin/core-geometry";
import {useMemo } from "react";

export function useViewportOptions() {
const viewportOptions = useMemo(() => ({
    viewState: async (iModel: IModelConnection) => {
      const viewState = await new ViewCreator3d(iModel).createDefaultView({
        cameraOn: false,
        // When the background map is on, it is better practice to have 
        //  the camera on.  Without the perspective the camera brings to
        //  rendering, the rendering system will try to use high definition
        //  for ALL tiles.
        skyboxOn: true,
        standardViewId: StandardViewId.Iso
      },
        // Keep only models that matters for this demo
        [
          "0x90000000423",  // Roof Design, DRWR04-OBSD-PLS-RF-M3-S-00001.dgn
          "0x90000000421",  // Roof Design, DRWR04-OBSD-PLS-RF-M3-S-00001.dgn
          "0x9000000041f",  // Roof Design, DRWR04-OBSD-PLS-RF-M3-S-00001.dgn
          "0xe0000000004",  // CompleteStreets
        ]
      );

      // Setup close-up view on metrostation model
      (viewState as ViewState3d).turnCameraOff();
      viewState.setOrigin(Point3d.fromJSON([284.5183092082257, -182.76836476521638, -51.932074469640334]));
      viewState.setExtents(Vector3d.fromJSON([182.06617691453454, 181.28561452690522, 154.47017209247488]))
      viewState.setRotation(YawPitchRollAngles.createDegrees(-39.690400441568016, 66.93833688123149, -47.94894215203335).toMatrix3d());
      
      // Adjust background map to fit with geoid
      viewState.displayStyle.changeBackgroundMapProps({groundBias:-31.3944});

      return viewState;
    }
  }), []);

  return viewportOptions;
}