import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../features/settings/settingApi";

import CompanyForm from "../../components/settings/CompanyForm";

import WorkingHoursForm from "../../components/settings/WorkingHoursForm";

import LeavePolicyForm from "../../components/settings/LeavePolicyForm";

import EmailSettingsForm from "../../components/settings/EmailSettingsForm";

const Settings = () => {
  const { data, isLoading } = useGetSettingsQuery();

  const [updateSettings] = useUpdateSettingsMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const settings = data?.data;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">System Settings</h1>

      <CompanyForm
        data={settings}

        onSave={updateSettings}
      />

      <WorkingHoursForm
        data={settings}

        onSave={updateSettings}
      />

      <LeavePolicyForm
        data={settings}

        onSave={updateSettings}
      />

      <EmailSettingsForm
        data={settings}

        onSave={updateSettings}
      />
    </div>
  );
};

export default Settings;
