"use client";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { Avatar } from "antd";
import { IoMdLogOut } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

const logOut = () => {
  localStorage.clear();
  window.location.reload();
};

const items: MenuProps["items"] = [
  {
    key: "1",
    danger: true,
    label: "Log Out",
    icon: <IoMdLogOut />,
    onClick: logOut,
  },
];

const ProfileSection = () => (
  <Dropdown menu={{ items }}>
    <div onClick={(e) => e.preventDefault()}>
      <Space>
          <Avatar
            className="flex items-center justify-center"
            size="large"
            shape="circle"
            icon={<RxAvatar />}
          />
      </Space>
    </div>
  </Dropdown>
);

export default ProfileSection;
