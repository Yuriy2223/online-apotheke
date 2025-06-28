// import styled, { keyframes } from "styled-components";

// export const OverlayModal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 10;
// `;
// const rotate = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;
// export const ModalContent = styled.div`
//   width: 315px;
//   position: relative;
//   border-radius: 12px;
//   padding: 50px 20px;
//   background-color: ${({ theme }) => theme.bgPrimary};
//   overflow: hidden;
//   z-index: 1;

//   &::before {
//     content: "";
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     width: 200%;
//     height: 200%;
//     background: ${({ theme }) => theme.gradient};
//     animation: ${rotate} 4s linear infinite;
//     z-index: -2;
//   }

//   &::after {
//     content: "";
//     position: absolute;
//     top: 2px;
//     left: 2px;
//     right: 2px;
//     bottom: 2px;
//     background-color: ${({ theme }) => theme.bgPrimary};
//     border-radius: 10px;
//     z-index: -1;
//     box-shadow: inset 0 0 10px rgba(0, 255, 247, 0.2);
//   }

//   @media (max-width: 374px) {
//     padding: 10px;
//     max-width: 300px;
//   }

//   @media (min-width: 768px) {
//     padding: 50px 60px;
//     width: 500px;
//   }
// `;
// export const CloseButton = styled.button`
//   position: absolute;
//   top: 14px;
//   right: 14px;
//   border: none;
//   background: transparent;
//   width: 44px;
//   height: 44px;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   svg {
//     color: ${({ theme }) => theme.textPrimary};
//     transition: all 0.3s ease;
//   }

//   &:hover,
//   &:active {
//     svg {
//       transform: rotate(3600deg) scale(1.2);
//       opacity: 0.8;
//       color: ${({ theme }) => theme.svg};
//     }
//   }
// `;
