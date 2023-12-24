"use client";
import { FiBriefcase, FiSlack } from "react-icons/fi";
import { PiStudentFill } from "react-icons/pi";
import { FaRegFaceLaughSquint, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import {
  FloatButton,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
} from "antd";

interface addBoardType {
  title: string;
  description: string;
}
export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("GENERAL");
  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Function to handle the page content change
  const handlePageChange = (pageName: string) => {
    setSelectedPage(pageName);
  };

  // Function to handle form submission
  const handleSubmit = async (values: addBoardType) => {
    // Create a FormData object
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);

    // Perform the POST request to your API with FormData
    try {
      const response = await fetch("/api/board", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Board created successfully");
      } else {
        console.error("Error creating board:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };
  // Function to render content based on the selected category
  const renderContent = () => {
    switch (selectedPage) {
      case "MEMES":
        return <div>Content for Memes</div>;
      case "TECH":
        return <div>Content for Tech</div>;
      case "ISSUE":
        return <div>Content for Issue</div>;
      case "GENERAL":
        return <div>GENERAL</div>;
    }
  };

  return (
    <main className="pt-20 flex min-h-screen min-w-screen justify-center text-6xl text-slate-300">
      <div className="w-4/5 h-screen shadow-2xl shadow-cyan-300">
        <nav className="w-full h-10 bg-gray-800 rounded-t-xl">
          <ul className="h-full flex justify-evenly">
            <li>
              <button
                type="button"
                onClick={() => handlePageChange("GENERAL")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${
                  selectedPage === "GENERAL" ? "bg-slate-900" : ""
                }`}
              >
                <span>
                  <FiSlack />
                </span>
                <span>GENERAL</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handlePageChange("MEMES")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${
                  selectedPage === "MEMES" ? "bg-slate-900" : ""
                }`}
              >
                <span>
                  <FaRegFaceLaughSquint />
                </span>
                <span>MEMES</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handlePageChange("TECH")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${
                  selectedPage === "TECH" ? "bg-slate-900" : ""
                }`}
              >
                <span>
                  <PiStudentFill />
                </span>
                <span>TECH</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handlePageChange("ISSUE")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${
                  selectedPage === "ISSUE" ? "bg-slate-900" : ""
                }`}
              >
                <span>
                  <FiBriefcase />
                </span>
                <span>ISSUE</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Render content based on the selected category */}
        <div className="border-2 border-red-500 w-full h-[80%] relative z-0">
          {renderContent()}
          <FloatButton
            shape="square"
            type="primary"
            style={{ position: "absolute", right: 50, bottom: 40 }}
            icon={<FaPlus />}
            onClick={showDrawer}
          />
        </div>
        <Drawer
          title="Create a new Board"
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 50,
            },
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              {/* Modify the Submit button to trigger the form submission */}
              <Button
                onClick={() => {
                  // Call the antd form validate function
                  form
                    .validateFields()
                    .then((values) => {
                      form.resetFields();
                      handleSubmit(values);
                      onClose();
                    })
                    .catch((info) => {
                      console.log("Validate Failed:", info);
                    });
                }}
                type="link"
                className="text-base border-[1px] border-blue-500 flex justify-center items-center"
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" onFinish={handleSubmit} form={form}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: "Please enter Title" }]}
                >
                  <Input placeholder="Please enter Title" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter description",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={15}
                    placeholder="Please enter description"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    </main>
  );
}
