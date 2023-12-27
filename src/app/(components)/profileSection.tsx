"use client";
import Link from "next/link";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { Avatar } from "antd";
import { IoMdLogOut } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import locale from "antd/es/date-picker/locale/en_US";

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
        <Link href="/profile">
          <Avatar
            className="flex items-center justify-center"
            size="large"
            shape="circle"
            icon={<RxAvatar />}
          />
        </Link>
      </Space>
    </div>
  </Dropdown>
);

export default ProfileSection;
