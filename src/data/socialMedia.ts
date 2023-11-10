import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ISocialMediaArray } from "../models/social.media";

const socialMedia: ISocialMediaArray = [
  { path: "https://github.com/NotatNiiK", icon: GitHubIcon },
  { path: "https://t.me/antoniobanderra", icon: TelegramIcon },
  {
    path: "https://www.linkedin.com/in/anton-pogadaiko",
    icon: LinkedInIcon,
  },
];

export default socialMedia;
