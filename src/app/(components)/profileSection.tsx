"use client";
import Link from "next/link";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { Avatar } from "antd";
import { IoMdLogOut } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

const items: MenuProps["items"] = [
  {
    key: "1",
    danger: true,
    label: "Log Out",
    icon: <IoMdLogOut />,
    // onClick: alert("working"),
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
