import type { SettingsSectionProps } from "./types";
import "./styles.css";

/** One block of the settings page: title, content and optional help */
function SettingsSection(props: SettingsSectionProps) {
  const { title, helper, children } = props;

  return (
    <section className="settings-section">
      <h3 className="settings-section-title">{title}</h3>
      {children}
      {helper ? <p className="settings-section-helper">{helper}</p> : null}
    </section>
  );
}

export default SettingsSection;
