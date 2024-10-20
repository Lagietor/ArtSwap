import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Cookies } from 'react-cookie';
import { useJwt } from 'react-jwt';

// const useUserStore = create(devtools((set, get) => ({
//     user: null,
//     isLogged: false,
//     isLoading: false,
//     error: null,

//     fetchUserData: async (userId) => {
//         set({ isLoading: true, error: null });
//         try {
//             const response = await fetch(`http://localhost:1000/api/user/${userId}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             set({ user: data, isLogged: true, isLoading: false });
//         } catch (error) {
//             set({ error: error.message, isLoading: false });
//         }
//     },

//     logout: () => set({ user: null, isLogged: false }),

//     initialize: () => {
//         const cookies = new Cookies();
//         const token = cookies.get('userToken');
//         const { decodedToken, isExpired } = useJwt(token);

//         const userId = decodedToken?.userId;
//         if (userId && !isExpired) {
//             get().fetchUserData(userId);
//         }
//     }
// })));

// export default useUserStore;