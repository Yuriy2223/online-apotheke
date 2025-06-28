import { RootState } from "../store";

export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;

export const selectIsModalClose = (state: RootState) => !state.modal.isOpen;

export const selectModalType = (state: RootState) => state.modal.modalType;

export const selectModalProps = (state: RootState) => state.modal.modalProps;
