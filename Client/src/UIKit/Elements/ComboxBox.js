import React, { useState, useEffect, useRef } from "react";
import Icon from "./Icon";
import classes from "./ComboBox.module.css";

const ComboxBox = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapTag = useRef();

  useEffect(() => {
    window.addEventListener("click", closeList);

    return () => {
      //clean up
      window.removeEventListener("click", closeList);
    };
  }, []);

  const closeList = (e) => {
    if (!wrapTag.current) {
      return;
    }
    if (wrapTag.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemSelect = (item) => {
    if (props.onSelect) {
      props.onSelect(item);
      handleToggle();
    }
  };

  const renderListItems = () => {
    return props.list.map((i) => {
      return (
        <li key={i} onClick={() => handleItemSelect(i)}>
          {i}
        </li>
      );
    });
  };

  const renderTrigger = () => {
    if (props.selected) {
      const item = props.list.find((i) => i === props.selected);
      if (item) {
        return item;
      }
    }
    return props.pleaseSelect;
  };

  return (
    <div tabIndex="0" onBlur={props.onBlur} className={classes.warper}>
      <div
        className={classes.combox}
        onClick={handleToggle}
        ref={wrapTag}
        data-theme={`${props.touched && props.hasError ? "error" : "no-error"}`}
      >
        <div>
          <div className={classes.trigger}>
            <Icon i={props.i} />
            <div className={classes.combox}>{renderTrigger()}</div>
            <Icon i="chevron-down" />
          </div>
          {isOpen && <div className={classes.options}>{renderListItems()}</div>}
        </div>
      </div>

      {props.touched && props.hasError && (
        <p className="error-msg">{props.errorMsg}</p>
      )}
    </div>
  );
};

export default ComboxBox;
