/* eslint-disable react/require-default-props */
import { createPortal } from "react-dom";
import { Dispatch, HTMLAttributes, SetStateAction, useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FocusLock from "react-focus-lock";

const effect = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 30,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Backdrop = ({ children, handleClose }: BackdropProps) => (
  <motion.div
    className="
      fixed inset-0 z-50
      flex items-center justify-center backdrop-blur-xl
    "
    onClick={handleClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

const ModalContent = ({ className, children, handleClose, ariaLabel }: ModalContentProps) => (
  <motion.div
    tabIndex={-1}
    role="dialog"
    aria-modal
    aria-label={ariaLabel}
    className={`relative ${className || "m-5 rounded-lg bg-white p-5 shadow-lg"}`}
    variants={effect}
    initial="hidden"
    animate="visible"
    exit="exit"
    onClick={(event) => event.stopPropagation()}
  >
    {children}
    {handleClose && (
      <button
        type="button"
        className="absolute top-0 right-0 p-2"
        onClick={handleClose}
        aria-label={`Close ${ariaLabel || "dialog"}`}
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
        </svg>
      </button>
    )}
  </motion.div>
);

export const Modal = ({
  children,
  className,
  isOpen,
  handleClose,
  hideCloseButton,
  backdropDismiss = true,
  onExitComplete,
  ariaLabel,
}: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [trigger, setTrigger] = onExitComplete ?? [undefined, undefined];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen || event.key !== "Escape") return;

      handleClose();
    },
    [handleClose, isOpen]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    // eslint-disable-next-line consistent-return
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isBrowser) return <></>;

  return createPortal(
    <AnimatePresence
      initial={false}
      exitBeforeEnter
      onExitComplete={() => setTrigger && trigger === "fired" && setTrigger("completed")}
    >
      {isOpen && (
        <Backdrop handleClose={backdropDismiss ? handleClose : undefined}>
          <FocusLock>
            <ModalContent
              className={className}
              handleClose={hideCloseButton ? undefined : handleClose}
              ariaLabel={ariaLabel}
            >
              {children}
            </ModalContent>
          </FocusLock>
        </Backdrop>
      )}
    </AnimatePresence>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("modal-portal")!
  );
};

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  handleClose: () => void;
  hideCloseButton?: boolean;
  backdropDismiss?: boolean;
  onExitComplete?: ["fired" | "completed" | undefined, Dispatch<SetStateAction<"fired" | "completed" | undefined>>];
  ariaLabel?: string;
};

type ModalContentProps = HTMLAttributes<HTMLDivElement> & {
  handleClose?: () => void;
  ariaLabel?: string;
};

type BackdropProps = HTMLAttributes<HTMLDivElement> & {
  handleClose?: () => void;
};
