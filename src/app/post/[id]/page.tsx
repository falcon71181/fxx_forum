"use client";
import React from "react";
import { PostData } from "@/app/(lib)/postData";
import { useState, useEffect } from "react";
import { BoardItem, BoardData } from "@/app/(lib)/boardList";
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
import { FaReply } from "react-icons/fa";
import BoardLoading from "@/app/(components)/loading";
import { isTokenValid } from "@/app/(lib)/isTokenValid";
import { replyList } from "@/app/(lib)/replyList";
import ReplyCard from "@/app/(components)/Reply";
import { ReplyType } from "@/app/(models)/Reply";
import { message } from "antd";

interface PostProps {
  params: {
    id: string;
  };
}

interface Reply {
  leader: string;
  reply: string;
  date: Date;
}

interface ReplyDataI {
  replies: Reply[];
  postId: string;
}

interface addReplyType {
  reply: string;
}

const Post = ({ params }: PostProps) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const successSubmit = () => {
    messageApi.open({
      type: "loading",
      content: "Creating New Post...",
      duration: 5,
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: addReplyType) => {
    successSubmit();
    // Create a FormData Object
    const replyFormData = new FormData();
    replyFormData.append("reply", values.reply);

    const token = localStorage.getItem("token") || null;
    // Perform the POST request to your  API with FormData
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/reply/${params.id}`,
        {
          method: "POST",
          body: replyFormData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        console.log("Reply created successfully");
        // Reload the page to render the new reply
        // TODO ; useRel to include new reply without reloading the page
        window.location.reload();
      } else {
        console.log("Error creating reply:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const [isValidSession, setIsValidSession] = useState(false);

  const [data, setData] = useState<BoardData[]>([]);
  const [postLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setLoading(true);

        const result = await PostData(params.id);
        // @ts-ignore
        const dataArray = Object.values(result);
        // @ts-ignore
        setData(dataArray[0]);
      } catch (error: any) {
        console.error("Error fetching board list:", error.message);
      } finally {
        // Set loading to false when fetch is completed (either success or error)
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const [replyData, setReply] = useState<ReplyDataI>();
  const [replyLoading, setReplyLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setReplyLoading(true);

        const result = await replyList(params.id);
        const replies = result[0];

        setReply(replies);
      } catch (error: any) {
        console.error("Error fetching reply list:", error.message);
      } finally {
        // Set loading to false when fetch is completed (either success or error)
        setReplyLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      const isTokenExist = localStorage.getItem("token");
      if (isTokenExist == null) {
        return;
      }

      try {
        const domain =
          typeof window !== "undefined" ? window.location.hostname : "";
        const data = await isTokenValid();
        setIsValidSession(data.valid);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // @ts-ignore
  const postOwner = data?.leader?.split("@")[0];
  return (
    <main className="pt-20 flex flex-col min-h-screen w-full">
      {contextHolder}
      <div className="w-full h-full flex justify-center items-center rounded-t-xl">
        {postLoading ? (
          <section className="w-full h-full flex justify-center items-center">
            <BoardLoading />
          </section>
        ) : (
          <div className="w-4/5 min-h-50 shadow-2xl shadow-cyan-300 rounded-t-xl border-2 border-grey-800">
            <div className="w-full h-24 bg-gray-800 rounded-t-xl flex justify-between items-center p-5">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-heading font-extrabold">
                  {/* @ts-ignore */}
                  {data?.title}
                </div>
                <div className="text-lg">By : @<span className="text-lg text-green-500 text-shadow-green-600 bg-[url('https://static.cracked.io/images/bg1.gif')]">{postOwner}</span></div>
              </div>
              <div className="text-sm">
                {/* @ts-ignore */}
                {data?.date?.toString()}
              </div>
            </div>
            <section className="w-full min-h-20 p-3 flex text-base text-slate-300 whitespace-pre-wrap hyphens-auto">
              {/* @ts-ignore */}
              {data?.description}
            </section>
          </div>
        )}
      </div>
      {replyData &&
        replyData.replies.map((reply: ReplyType) => (
          <ReplyCard
            key={reply.date.toString()}
            leader={reply.leader}
            reply={reply.reply}
            date={reply.date}
          />
        ))}

      {isValidSession && (
        <FloatButton
          shape="square"
          type="primary"
          style={{ position: "fixed", right: 50, bottom: 50 }}
          icon={<FaReply />}
          onClick={showDrawer}
        />
      )}
      <Drawer
        title="Write a Reply to Post..."
        height={300}
        onClose={onClose}
        placement="bottom"
        open={open}
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
        {/* @ts-ignore */}
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="reply"
                label="Reply"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Reply",
                  },
                ]}
              >
                <Input.TextArea
                  rows={7}
                  placeholder="Please enter your Reply"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </main>
  );
};

export default Post;
