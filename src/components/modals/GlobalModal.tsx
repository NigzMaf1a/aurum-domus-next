import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
}

export default function GlobalModal({ children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let root = document.getElementById("modal-root") as HTMLElement | null;

    // Create dynamically if not found
    if (!root) {
      root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }

    setModalRoot(root);

    // Cleanup when unmounting
    return () => {
      if (root && root.childElementCount === 0) {
        root.remove();
      }
    };
  }, []);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      style={{ zIndex: 1050 }}
    >
      {children}
    </div>,
    modalRoot
  );
}
