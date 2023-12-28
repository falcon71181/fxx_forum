"use client";
import { FiBriefcase, FiSlack } from "react-icons/fi";
import { PiStudentFill } from "react-icons/pi";
import { FaRegFaceLaughSquint, FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import BoardLoading from "./(components)/loading";
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
// import { GeneralCateg, MemeCateg, TechCateg, IssueCateg } from "./(components)/boardCateg";
import BoardCategory from "./(components)/boardCateg";
import { boardList, BoardItem, BoardData } from "./(lib)/boardList";
import BoardCard from "./(components)/board";

const identify = (str: string) => {
  if (str === "GENERAL") {
    return 0;
  } else if (str === "MEMES") {
    return 1;
  } else if (str === "TECH") {
    return 2;
  } else if (str === "ISSUE") {
    return 3;
  } else {
    return -1;
  }
};

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
  const handleSubmit = async (values: addBoardType, identifier: string) => {
    // Create a FormData object
    const typeIdentity = identify(identifier).toString();
    const formData = new FormData();
    formData.append("identifier", typeIdentity);
    formData.append("title", values.title);
    formData.append("description", values.description);

    const token = localStorage.getItem("authorization") || null;
    // Perform the POST request to your API with FormData
    try {
      const response = await fetch("/api/board", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  // const renderContent = () => {
  //   switch (selectedPage) {
  //     case "MEMES":
  //       return <MemeCateg />;
  //     case "TECH":
  //       return <TechCateg />;
  //     case "ISSUE":
  //       return <IssueCateg />;
  //     case "GENERAL":
  //       return <GeneralCateg />;
  //   }
  // };
  //

  const [data, setData] = useState<BoardItem[]>([]);
  const [boardLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setLoading(true);

        const result = await boardList();
        // @ts-ignore
        const dataArray = Object.values(result);
        // @ts-ignore
        setData(dataArray);
      } catch (error: any) {
        console.error("Error fetching board list:", error.message);
      } finally {
        // Set loading to false when fetch is completed (either success or error)
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="pt-20 flex min-h-screen min-w-screen justify-center text-6xl text-slate-300">
      <div className="w-4/5 min-h-screen shadow-2xl shadow-cyan-300">
        <nav className="w-full h-10 bg-gray-800 rounded-t-xl">
          <ul className="h-full flex justify-evenly">
            <li>
              <button
                type="button"
                onClick={() => handlePageChange("GENERAL")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${selectedPage === "GENERAL" ? "bg-slate-900" : ""
                  }`}
              >
                <span>
                  <FiSlack />
                </span>
                <span>POST - BOARD</span>
              </button>
            </li>
            {/* <li>
              <button
                type="button"
                onClick={() => handlePageChange("MEMES")}
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${selectedPage === "MEMES" ? "bg-slate-900" : ""
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
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${selectedPage === "TECH" ? "bg-slate-900" : ""
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
                className={`text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer h-full flex items-center justify-center font-heading px-3 text-xl gap-3 ${selectedPage === "ISSUE" ? "bg-slate-900" : ""
                  }`}
              >
                <span>
                  <FiBriefcase />
                </span>
                <span>ISSUE</span>
              </button>
            </li> */}
          </ul>
        </nav>

        {/* Render content based on the selected category */}
        <div className="border-2 border-red-500 w-full min-h-[80%] z-0">
          {/* {renderContent()} */}
          <div className='w-full'>
            {boardLoading ? (
              <section className="w-full h-full flex justify-center items-center">
                <BoardLoading />
              </section>
            ) : (
              data.map((item) => (
                <BoardCard
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  date={new Date(item.date)}
                />
              ))
            )}
          </div>
          <FloatButton
            shape="square"
            type="primary"
            style={{ position: "fixed", right: 50, bottom: 50 }}
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
                      handleSubmit(values, selectedPage);
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
          {/* @ts-ignore */}
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
