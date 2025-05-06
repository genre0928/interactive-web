import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";

const Wrapper = styled.div`
  display: flex;
`;
const ContactCalledButton = styled(motion.div)`
  width: 50px;
  height: 50px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  font-size: 12px;
  font-weight: bold;
  position: fixed;
  border-radius: 50%;
  right: 10px;
  bottom: 80px;
  cursor: pointer;
`;

const ExitButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background-color: transparent;
  color: white;
  border: none;
  display: flex;
`;

const ContactSection = styled(motion.form)`
  padding: 20px 15px;
  position: fixed;
  background-color: ${(props) => props.theme.black.lighter};
  color: white;
  border-radius: 15px;
  font-weight: bold;
  width: 400px;
  height: 700px;
  right: 100px;
  bottom: 100px;
  z-index: 1;
`;
const Contacttitle = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 5px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
`;
const ContactMessage = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 5px 5px;
  resize: none;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
`;
const SendButton = styled.button`
  width: 100%;
  height: 40px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  border: 2px solid white;
  margin-top: 10px;
  background-color: transparent;
`;

const contactVariants = {
  initial: {},
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  hover: {
    y: [0, -8, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

interface Emailform {
  title: string;
  context: string;
}

function ContactButton() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      context: "",
    },
  });
  const onClickedContact = () => {
    setOpen((prev) => !prev!);
  };
  const onSubmit = async (data: { title: string; context: string }) => {
    const success = await sendContactEmail(data);
    if (success) {
      setOpen((prev) => !prev);
      reset();
    } else {
      alert("전송에 실패했습니다.");
    }
  };

  const sendContactEmail = async ({ title, context }: Emailform) => {
    const service_Id = "interactive-webservice";
    const template_Id = "template_6pd9fx3";
    const public_key = "blLU5cnsuYBA9nZKv";
    const templateParams = {
      title,
      context,
    };
    try {
      await emailjs.send(service_Id, template_Id, templateParams, public_key);
      toast("이메일 전송 성공", { position: "bottom-right" });
      return true;
    } catch (e) {
      toast("이메일 전송 실패", { position: "bottom-right" });
      return false;
    }
  };
  return (
    <Wrapper>
      <AnimatePresence>
        {!open ? (
          <ContactCalledButton
            key="contact-btn"
            variants={contactVariants}
            onClick={onClickedContact}
            layoutId="contact"
            exit="exit"
            whileHover="hover"
          >
            Contact
          </ContactCalledButton>
        ) : null}
        {open ? (
          <ContactSection
            key="contact-sec"
            variants={contactVariants}
            animate="animate"
            exit="exit"
            layoutId="contact"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>문의 및 개선사항을 작성해주세요. </div>
            <ExitButton onClick={onClickedContact}>X</ExitButton>
            제목
            <Contacttitle
              {...register("title", {
                required: {
                  value: true,
                  message: "제목을 입력해주세요",
                },
                validate: {
                  isEmpty: (value) =>
                    value.trim().length > 0 || "공백 입력 금지입니다.",
                },
              })}
            />
            {errors.title ? (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {errors.title.message}
              </div>
            ) : null}
            내용
            <ContactMessage
              {...register("context", {
                required: { value: true, message: "내용을 입력해주세요." },
                validate: {
                  isEmpty: (value) =>
                    value.trim().length > 0 || "공백 입력 금지입니다.",
                },
              })}
            />
            {errors.context ? (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {errors.context.message}
              </div>
            ) : null}
            <SendButton type="submit">전송하기</SendButton>
          </ContactSection>
        ) : null}
      </AnimatePresence>
      <ToastContainer />
    </Wrapper>
  );
}

export default ContactButton;
