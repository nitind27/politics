import { SidebarMenuItem } from "./SidebarMenuItem";
// import { useIntl } from 'react-intl';

const SidebarMenuMain = () => {
  // const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="home"
        // title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        title="Dashboard"
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/manage"
        icon="calendar"
        title="Manage"
        fontIcon="calendar"
      />

    </>
  );
};

export { SidebarMenuMain };
