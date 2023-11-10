import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

interface ISocialMedia {
  path: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

type ISocialMediaArray = ISocialMedia[];

export type { ISocialMediaArray };
