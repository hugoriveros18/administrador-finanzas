export const LoginWallet = () => {
  return (
    <span className="flex justify-center items-center bg-redVerminton p-3 text-yellowSelective rounded-full">
      <svg
        fill="currentColor"
        height={36}
        viewBox="0 0 24 24"
        width={36}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
      </svg>
    </span>
  );
};

interface BasicIconProps {
  width?: string;
  height?: string;
}

export const GoogleIcon = ({ width = "20", height = "20" }: BasicIconProps) => {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 18 19"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.204 8.206h-.537v-.028h-6v2.667h3.767A3.998 3.998 0 0 1 4.667 9.51a4 4 0 0 1 4-4c1.02 0 1.947.385 2.653 1.013l1.886-1.885a6.64 6.64 0 0 0-4.54-1.794 6.667 6.667 0 1 0 6.538 5.36"
        fill="#FFC107"
      />
      <path
        d="m2.769 6.408 2.19 1.607A4 4 0 0 1 8.667 5.51c1.02 0 1.947.385 2.653 1.013l1.886-1.885a6.64 6.64 0 0 0-4.54-1.794A6.66 6.66 0 0 0 2.77 6.408"
        fill="#FB5B5B"
      />
      <path
        d="M8.667 16.178a6.64 6.64 0 0 0 4.47-1.73l-2.064-1.746a3.97 3.97 0 0 1-2.406.81 4 4 0 0 1-3.761-2.65l-2.174 1.676a6.66 6.66 0 0 0 5.935 3.64"
        fill="#4CAF50"
      />
      <path
        d="M15.204 8.206h-.537v-.028h-6v2.667h3.767a4 4 0 0 1-1.362 1.857h.001l2.063 1.745c-.146.133 2.197-1.602 2.197-4.936a6.7 6.7 0 0 0-.13-1.305"
        fill="#1976D2"
      />
    </svg>
  );
};

export const RigthArrowIcon = ({
  width = "20",
  height = "20",
}: BasicIconProps) => {
  return (
    <svg
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EyeIcon = ({ width = "20", height = "20" }: BasicIconProps) => {
  return (
    <svg
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EyeSlashIcon = ({
  width = "20",
  height = "20",
}: BasicIconProps) => {
  return (
    <svg
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EmailIcon = ({ width = "20", height = "20" }: BasicIconProps) => {
  return (
    <svg
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LockIcon = ({ width = "20", height = "20" }: BasicIconProps) => {
  return (
    <svg
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CategoryIcon = ({
  width = "20",
  height = "20",
}: BasicIconProps) => {
  return (
    <svg
      fill="currentColor"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
      <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
      <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    </svg>
  );
};

export const AccountIcon = ({
  width = "20",
  height = "20",
}: BasicIconProps) => {
  return (
    <svg
      fill="currentColor"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
      <path
        clipRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const TransaccionIcon = ({
  width = "20",
  height = "20",
}: BasicIconProps) => {
  return (
    <svg
      fill="currentColor"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.04 16.5.5-1.5h6.42l.5 1.5H8.29Zm7.46-12a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm-3 2.25a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V9Zm-3 2.25a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MovimientosIcon = ({
  width = "20",
  height = "20",
}: BasicIconProps) => {
  return (
    <svg
      fill="currentColor"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  );
};

export const EllipsisHorizontalIcon = ({
  width = "20",
  height = "20",
}: BasicIconProps) => {
  return (
    <svg
      fill="currentColor"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const EditItemIcon = ({
  width = "20",
  height = "20",
}: BasicIconProps) => {
  return (
    <svg
      fill="currentColor"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
    </svg>
  );
};

export const TrashItemIcon = ({
  width = "20",
  height = "20",
}: BasicIconProps) => {
  return (
    <svg
      fill="currentColor"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
        fillRule="evenodd"
      />
    </svg>
  );
};
