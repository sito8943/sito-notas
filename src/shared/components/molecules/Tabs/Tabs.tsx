import type { TabsProps } from "./types";
import "./styles.css";

/** Chip tabs that select one value (filters such as All / Favorites / tags) */
function Tabs<T extends string | number>(props: TabsProps<T>) {
  const { tabs, value, onChange, label, className = "" } = props;

  return (
    <div role="tablist" aria-label={label} className={`tabs ${className}`}>
      {tabs.map((tab) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={tab.disabled}
            onClick={() => onChange(tab.value)}
            className={`tabs-tab sito-ui-pressable ${selected ? "selected" : ""}`}
          >
            {tab.label}
            {tab.count ? (
              <span className="tabs-tab-count">{tab.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
