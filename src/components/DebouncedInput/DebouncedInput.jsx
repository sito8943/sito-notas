/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDebounce } from "use-lodash-debounce";

function DebouncedInput(props) {
  const { onDebounceTrigger, delay = 500, initialValue, ...rest } = props;
  const [value, setValue] = useState(initialValue ?? "");
  const debounced = useDebounce(value, delay);

  useEffect(() => {
    if (value.length) onDebounceTrigger(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <input value={value} onChange={(e) => setValue(e.target.value)} {...rest} />
  );
}

export default DebouncedInput;
