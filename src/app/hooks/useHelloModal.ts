import { useRecoilState, atom } from "recoil";

const modalIsOpenState = atom<boolean>({
  key: "modalIsOpenState",
  default: false,
});

export const useHelloModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalIsOpenState);

  return {
    isModalOpen,
    setIsModalOpen,
  };
};
