import React, { useState, useRef, useEffect, useCallback } from "react";
import { Iconfont } from "../iconfont";
import "./index.scss";
import dayjs from "dayjs";
import config from "../../config";
require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");
const Header = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(dayjs().format("M月DD日 周dd HH:mm"));
  const [menuShow, setMenuShow] = useState(false);
  const [inputShow, setInputShow] = useState(false);
  const [myName, setMyName] = useState(config.name);
  window.setInterval(() => {
    const newTime = dayjs().format("M月DD日 周dd HH:mm");
    setTime(newTime);
  }, 60000);
  const windowClick = useCallback(
    ({ target }) => {
      if (inputShow || menuShow) {
        if (
          target.parentNode === menuRef.current ||
          target.parentNode.parentNode === menuRef.current
        ) {
          return;
        }
        setMenuShow(false);
        setInputShow(false);
      }
    },
    [inputShow, menuShow]
  );
  useEffect(() => {
    window.addEventListener("click", windowClick);
    return () => {
      window.removeEventListener("click", windowClick);
    };
  }, [windowClick]);
  return (
    <header className="AppFinder">
      <div className="FinderLeft">
        <div>
          <Iconfont
            type="icon-osi"
            style={{
              fontSize: 22,
            }}
          />
        </div>
        <div
          onClick={() => setMenuShow(true)}
          ref={menuRef}
          className="pointer"
        >
          {inputShow ? (
            <input
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
            />
          ) : (
            <span className={menuShow ? "text active" : "text"}>
              {myName}
            </span>
          )}
          <ul className={menuShow ? "menu active" : "menu"}>
            <li onClick={() => setInputShow(true)}>自定义标题</li>
            <div className="line"></div>
            <li>你好</li>
            <div className="line"></div>
            <li>感谢来到这里的你</li>
          </ul>
        </div>
        <div onClick={() => setMenuShow(true)}
          ref={menuRef}
          className="pointer"
        >文件</div>
        <div>编辑</div>
        <div>显示</div>
        <div>前往</div>
        <div>窗口</div>
        <div>帮助</div>
      </div>
      <div className="FinderRight">
        <div>{time}</div>
        <a href={config.github}>
          <Iconfont
            type="icon-ren"
            style={{
              fontSize: 22,
            }}
          />
        </a>
        {/*<a href="https://github.com/Adashuai5">
          <Iconfont
            type="icon-github"
            style={{
              fontSize: 22,
            }}
          />
        </a>*/}
      </div>
    </header>
  );
};

export default Header;
