import React, { useEffect, useState } from "react";
import { CloseButton } from "../close-button";

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // in milliseconds
}

export const ToastNotification = ({
  message,
  isVisible,
  onClose,
  duration = 3000, // Default duration 3 seconds
}: ToastNotificationProps) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    let timer: NodeJS.Timeout;
    if (isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!show) return null;

  return (
    <div className="top-15 animate-slideInFromRight fixed right-10 z-50 w-[250px] rounded-lg bg-grey03 pb-30 shadow-md">
      <div className="flex h-full justify-end pr-12 pt-12">
        <CloseButton onClick={onClose} />
      </div>
      <div className="pr-8 text-center text-lg text-black07 ">{message}</div>
    </div>
  );
};
