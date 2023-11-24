import { memo } from "react";
import PropTypes from "prop-types";

// @sito/ui
import { Button, PrintAfter } from "@sito/ui";

function TabButton({ i, id, text, active, onClick }) {
  return (
    <PrintAfter animation="appear" delay={i * 100}>
      <Button
        onClick={() => onClick(id)}
        color={active ? "primary" : "inherit"}
        className={`submit`}
      >
        {text}
      </Button>
    </PrintAfter>
  );
}

const TabButtonMemo = memo(
  (props) => <TabButton {...props} />,
  (newProps, oldProps) =>
    newProps.active === oldProps.active &&
    newProps.id === oldProps.id &&
    newProps.i === oldProps.i &&
    newProps.text === oldProps.text &&
    newProps.onClick === oldProps.onClick
);

TabButtonMemo.displayName = "TabButton";

TabButtonMemo.propTypes = {
  i: PropTypes.number,
  id: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default TabButton;
