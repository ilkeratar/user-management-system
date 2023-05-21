import {create} from "zustand";

const API_BASE_URL = "http://localhost:8000";

export const useUsersStore=create((set) => ({
  usersDB: null,
  isLoading: false,
  error: null,
  usersFetch: async () => {
    set({isLoading:true});
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (response.status === 401) {
      throw new Error("Yetkilendirme hatası");
    }

    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      set({ isLoading: false });
      set({ error: json.error });
    }
    if (response.ok) {
      set({ usersDB: json });
      set({ isLoading: false });
      set({ error: null });
    }
  },
  usersAdd: async (userData) => {
    const token = localStorage.getItem("token");
    console.log(userData);
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (response.status === 401) {
        throw new Error("Yetkilendirme hatası");
      }
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        // Yeni kullanıcı başarıyla eklendi
        console.log("Yeni kullanıcı eklendi");
        set({ error: null });
        set({ isLoading: false });
      } else {
        // Hata durumunda
        set({ isLoading: false });
        set({ error: json.error });
      }
    } catch (error) {
      console.error("İstek sırasında bir hata oluştu", error);
    }
  }
}))
