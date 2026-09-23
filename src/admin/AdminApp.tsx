import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Film,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  MoreVertical,
  Pencil,
  Plus,
  Settings,
  Trash2,
  UserRound,
  Video,
  X
} from "lucide-react";
import "./admin.css";

import { supabase } from "../lib/supabaseClient";
import ContentManagement from "./ContentManagement";

type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
  active: boolean;
  sort_order: number;
};

type ServiceFeature = {
  id: number;
  service_id: number;
  title: string;
  active: boolean;
  sort_order: number;
};

type MediaType = "image" | "video";

type MediaItem = {
  id: string;
  title: string;
  type: MediaType;
  url: string;
  storage_path: string;
  created_at: string;
};

type BookingStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "completed"
  | "cancelled";

type Booking = {
  id: string;
  customer: string;
  phone: string;
  email: string | null;
  service: string;
  people: number | null;
  date: string | null;
  time: string | null;
  notes: string | null;
  status: BookingStatus;
  createdAt: string;
};

function AdminApp() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* -----------------------------
     SERVICES
  ----------------------------- */

  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] =
    useState(true);
  const [servicesError, setServicesError] =
    useState("");

  const [showServiceModal, setShowServiceModal] =
    useState(false);

  const [editingService, setEditingService] =
    useState<Service | null>(null);

  /* -----------------------------
     SERVICE FEATURES
  ----------------------------- */

  const [serviceFeatures, setServiceFeatures] =
    useState<ServiceFeature[]>([]);

  const [featuresLoading, setFeaturesLoading] =
    useState(false);

  const [showFeaturesModal, setShowFeaturesModal] =
    useState(false);

  const [
    selectedFeatureService,
    setSelectedFeatureService
  ] = useState<Service | null>(null);

  /* -----------------------------
     BOOKINGS
  ----------------------------- */

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [bookingsLoading, setBookingsLoading] =
    useState(true);

  const [bookingsError, setBookingsError] =
    useState("");

  /* -----------------------------
     MEDIA
  ----------------------------- */

  const [media, setMedia] =
    useState<MediaItem[]>([]);

  const [mediaLoading, setMediaLoading] =
    useState(true);

  const [mediaError, setMediaError] =
    useState("");

  const [showMediaModal, setShowMediaModal] =
    useState(false);

  const [mediaModalType, setMediaModalType] =
    useState<MediaType>("image");

  const [editingMedia, setEditingMedia] =
    useState<MediaItem | null>(null);

  /* -----------------------------
     BOOKINGS
  ----------------------------- */

  const loadBookings = async () => {
    setBookingsLoading(true);
    setBookingsError("");

    const { data, error } = await supabase
      .from("service_requests")
      .select(
        "id, name, phone, email, service_name, people, requested_date, requested_time, notes, status, created_at"
      )
      .order("created_at", {
        ascending: false
      });

    if (error) {
      console.error(
        "Supabase service requests error:",
        error
      );

      setBookingsError(
        "تعذر تحميل طلبات الخدمات حاليًا."
      );

      setBookings([]);
      setBookingsLoading(false);

      return;
    }

    setBookings(
      (data ?? []).map((item) => ({
        id: item.id,
        customer: item.name,
        phone: item.phone,
        email: item.email,
        service: item.service_name,
        people: item.people,
        date: item.requested_date,
        time: item.requested_time
          ? String(item.requested_time).slice(0, 5)
          : null,
        notes: item.notes,
        status: item.status as BookingStatus,
        createdAt: item.created_at
      }))
    );

    setBookingsLoading(false);
  };

  const updateBookingStatus = async (
    id: string,
    status: BookingStatus
  ) => {
    const previous = bookings;

    setBookings((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status
            }
          : item
      )
    );

    const { error } = await supabase
      .from("service_requests")
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);

    if (error) {
      console.error(
        "Supabase status update error:",
        error
      );

      setBookings(previous);

      window.alert(
        "تعذر تحديث حالة الطلب. يرجى المحاولة مرة أخرى."
      );
    }
  };

  /* -----------------------------
     SERVICES
  ----------------------------- */

  const loadServices = async () => {
    setServicesLoading(true);
    setServicesError("");

    const { data, error } = await supabase
      .from("services")
      .select(
        "id, title, description, image, active, sort_order"
      )
      .order("sort_order", {
        ascending: true
      })
      .order("created_at", {
        ascending: true
      });

    if (error) {
      console.error(
        "Supabase services error:",
        error
      );

      setServicesError(
        "تعذر تحميل الخدمات حاليًا."
      );

      setServices([]);
      setServicesLoading(false);

      return;
    }

    setServices(
      (data ?? []) as Service[]
    );

    setServicesLoading(false);
  };

  const saveService = async (
    title: string,
    description: string,
    image: string,
    serviceId?: number
  ) => {
    if (!title.trim()) {
      window.alert(
        "يرجى كتابة اسم الخدمة."
      );

      return false;
    }

    if (serviceId) {
      const previous = services;

      setServices((items) =>
        items.map((item) =>
          item.id === serviceId
            ? {
                ...item,
                title: title.trim(),
                description:
                  description.trim(),
                image: image.trim()
              }
            : item
        )
      );

      const { error } = await supabase
        .from("services")
        .update({
          title: title.trim(),
          description:
            description.trim(),
          image: image.trim(),
          updated_at:
            new Date().toISOString()
        })
        .eq("id", serviceId);

      if (error) {
        console.error(
          "Update service error:",
          error
        );

        setServices(previous);

        window.alert(
          "تعذر تحديث الخدمة."
        );

        return false;
      }

      return true;
    }

    const nextSortOrder = services.length
      ? Math.max(
          ...services.map(
            (item) => item.sort_order
          )
        ) + 1
      : 1;

    const { data, error } =
      await supabase
        .from("services")
        .insert({
          title: title.trim(),
          description:
            description.trim(),
          image: image.trim(),
          active: true,
          sort_order: nextSortOrder
        })
        .select(
          "id, title, description, image, active, sort_order"
        )
        .single();

    if (error) {
      console.error(
        "Insert service error:",
        error
      );

      window.alert(
        "تعذر إضافة الخدمة."
      );

      return false;
    }

    if (data) {
      setServices((items) => [
        ...items,
        data as Service
      ]);
    }

    return true;
  };

  const toggleService = async (
    id: number
  ) => {
    const current = services.find(
      (item) => item.id === id
    );

    if (!current) return;

    const newActive = !current.active;
    const previous = services;

    setServices((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              active: newActive
            }
          : item
      )
    );

    const { error } = await supabase
      .from("services")
      .update({
        active: newActive,
        updated_at:
          new Date().toISOString()
      })
      .eq("id", id);

    if (error) {
      console.error(
        "Toggle service error:",
        error
      );

      setServices(previous);

      window.alert(
        "تعذر تحديث حالة الخدمة."
      );
    }
  };

  const deleteService = async (
    id: number
  ) => {
    const service = services.find(
      (item) => item.id === id
    );

    if (!service) return;

    if (
      !window.confirm(
        `هل تريد حذف خدمة "${service.title}"؟`
      )
    ) {
      return;
    }

    const previous = services;

    setServices((items) =>
      items.filter(
        (item) => item.id !== id
      )
    );

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Delete service error:",
        error
      );

      setServices(previous);

      window.alert(
        "تعذر حذف الخدمة."
      );
    }
  };

  /* -----------------------------
     SERVICE FEATURES
  ----------------------------- */

  const loadServiceFeatures = async (
    serviceId: number
  ) => {
    setFeaturesLoading(true);

    const { data, error } =
      await supabase
        .from("service_features")
        .select(
          "id, service_id, title, active, sort_order"
        )
        .eq("service_id", serviceId)
        .order("sort_order", {
          ascending: true
        })
        .order("created_at", {
          ascending: true
        });

    if (error) {
      console.error(
        "Supabase service features error:",
        error
      );

      setServiceFeatures([]);
      setFeaturesLoading(false);

      window.alert(
        "تعذر تحميل مزايا الخدمة."
      );

      return;
    }

    setServiceFeatures(
      (data ?? []) as ServiceFeature[]
    );

    setFeaturesLoading(false);
  };

  const openFeaturesManager = async (
    service: Service
  ) => {
    setSelectedFeatureService(
      service
    );

    setShowFeaturesModal(true);

    await loadServiceFeatures(
      service.id
    );
  };

  const closeFeaturesManager = () => {
    setShowFeaturesModal(false);
    setSelectedFeatureService(null);
    setServiceFeatures([]);
  };

  const saveServiceFeature = async (
    title: string,
    featureId?: number
  ) => {
    if (!selectedFeatureService) {
      return false;
    }

    if (!title.trim()) {
      window.alert(
        "يرجى كتابة اسم الميزة."
      );

      return false;
    }

    if (featureId) {
      const previous =
        serviceFeatures;

      setServiceFeatures((items) =>
        items.map((item) =>
          item.id === featureId
            ? {
                ...item,
                title: title.trim()
              }
            : item
        )
      );

      const { error } =
        await supabase
          .from("service_features")
          .update({
            title: title.trim(),
            updated_at:
              new Date().toISOString()
          })
          .eq("id", featureId);

      if (error) {
        console.error(
          "Update service feature error:",
          error
        );

        setServiceFeatures(
          previous
        );

        window.alert(
          "تعذر تحديث الميزة."
        );

        return false;
      }

      return true;
    }

    const nextSortOrder =
      serviceFeatures.length
        ? Math.max(
            ...serviceFeatures.map(
              (item) =>
                item.sort_order
            )
          ) + 1
        : 1;

    const { data, error } =
      await supabase
        .from("service_features")
        .insert({
          service_id:
            selectedFeatureService.id,
          title: title.trim(),
          active: true,
          sort_order:
            nextSortOrder
        })
        .select(
          "id, service_id, title, active, sort_order"
        )
        .single();

    if (error) {
      console.error(
        "Insert service feature error:",
        error
      );

      window.alert(
        "تعذر إضافة الميزة."
      );

      return false;
    }

    if (data) {
      setServiceFeatures(
        (items) => [
          ...items,
          data as ServiceFeature
        ]
      );
    }

    return true;
  };

  const toggleServiceFeature = async (
    id: number
  ) => {
    const current =
      serviceFeatures.find(
        (item) => item.id === id
      );

    if (!current) {
      return;
    }

    const newActive =
      !current.active;

    const previous =
      serviceFeatures;

    setServiceFeatures((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              active: newActive
            }
          : item
      )
    );

    const { error } =
      await supabase
        .from("service_features")
        .update({
          active: newActive,
          updated_at:
            new Date().toISOString()
        })
        .eq("id", id);

    if (error) {
      console.error(
        "Toggle service feature error:",
        error
      );

      setServiceFeatures(
        previous
      );

      window.alert(
        "تعذر تحديث حالة الميزة."
      );
    }
  };

  const deleteServiceFeature = async (
    id: number
  ) => {
    const feature =
      serviceFeatures.find(
        (item) => item.id === id
      );

    if (!feature) {
      return;
    }

    if (
      !window.confirm(
        `هل تريد حذف الميزة "${feature.title}"؟`
      )
    ) {
      return;
    }

    const previous =
      serviceFeatures;

    setServiceFeatures((items) =>
      items.filter(
        (item) => item.id !== id
      )
    );

    const { error } =
      await supabase
        .from("service_features")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(
        "Delete service feature error:",
        error
      );

      setServiceFeatures(
        previous
      );

      window.alert(
        "تعذر حذف الميزة."
      );
    }
  };

  /*
   * تغيير ترتيب المزايا
   * يتم تبديل sort_order بين الميزة الحالية
   * والميزة التي قبلها أو بعدها.
   */
  const moveServiceFeature = async (
    id: number,
    direction: "up" | "down"
  ) => {
    const index = serviceFeatures.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      return;
    }

    const targetIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= serviceFeatures.length
    ) {
      return;
    }

    const current =
      serviceFeatures[index];

    const target =
      serviceFeatures[targetIndex];

    const previous =
      serviceFeatures;

    /*
     * نغيّر الواجهة فورًا حتى يشعر المدير
     * أن العملية تمت مباشرة.
     */
    const updated = [
      ...serviceFeatures
    ];

    updated[index] = {
      ...target,
      sort_order:
        current.sort_order
    };

    updated[targetIndex] = {
      ...current,
      sort_order:
        target.sort_order
    };

    setServiceFeatures(updated);

    /*
     * تحديث الميزة الحالية
     */
    const { error } =
      await supabase
        .from("service_features")
        .update({
          sort_order:
            target.sort_order,
          updated_at:
            new Date().toISOString()
        })
        .eq("id", current.id);

    if (error) {
      console.error(
        "Move service feature error:",
        error
      );

      setServiceFeatures(
        previous
      );

      window.alert(
        "تعذر تغيير ترتيب الميزة."
      );

      return;
    }

    /*
     * تحديث الميزة الأخرى بالقيمة القديمة
     */
    const {
      error: targetError
    } = await supabase
      .from("service_features")
      .update({
        sort_order:
          current.sort_order,
        updated_at:
          new Date().toISOString()
      })
      .eq("id", target.id);

    if (targetError) {
      console.error(
        "Update target feature order error:",
        targetError
      );

      setServiceFeatures(
        previous
      );

      window.alert(
        "تعذر حفظ ترتيب الميزة."
      );

      return;
    }
  };

  /* -----------------------------
     MEDIA
  ----------------------------- */

  const loadMedia = async () => {
    setMediaLoading(true);
    setMediaError("");

    const { data, error } =
      await supabase
        .from("site_media")
        .select(
          "id, title, type, url, storage_path, created_at"
        )
        .order("created_at", {
          ascending: false
        });

    if (error) {
      console.error(
        "Supabase media error:",
        error
      );

      setMediaError(
        "تعذر تحميل الصور والفيديوهات."
      );

      setMedia([]);
      setMediaLoading(false);

      return;
    }

    setMedia(
      (data ?? []) as MediaItem[]
    );

    setMediaLoading(false);
  };

  const uploadMedia = async (
    file: File,
    title: string,
    type: MediaType
  ) => {
    if (!file) {
      window.alert(
        "يرجى اختيار ملف."
      );

      return false;
    }

    const safeName = file.name
      .toLowerCase()
      .replace(
        /[^a-z0-9._-]/g,
        "-"
      )
      .replace(/-+/g, "-");

    const path = `media/${crypto.randomUUID()}-${safeName}`;

    const { error: uploadError } =
      await supabase.storage
        .from("site-media")
        .upload(path, file, {
          upsert: false,
          contentType: file.type
        });

    if (uploadError) {
      console.error(
        "Media upload error:",
        uploadError
      );

      window.alert(
        "تعذر رفع الملف إلى التخزين."
      );

      return false;
    }

    const {
      data: publicUrlData
    } = supabase.storage
      .from("site-media")
      .getPublicUrl(path);

    const publicUrl =
      publicUrlData.publicUrl;

    const { data, error: insertError } =
      await supabase
        .from("site_media")
        .insert({
          title:
            title.trim() ||
            file.name,
          type,
          url: publicUrl,
          storage_path: path
        })
        .select(
          "id, title, type, url, storage_path, created_at"
        )
        .single();

    if (insertError) {
      console.error(
        "Insert media error:",
        insertError
      );

      await supabase.storage
        .from("site-media")
        .remove([path]);

      window.alert(
        "تم رفع الملف لكن تعذر تسجيله في قاعدة البيانات."
      );

      return false;
    }

    if (data) {
      setMedia((items) => [
        data as MediaItem,
        ...items
      ]);
    }

    return true;
  };

  const replaceMedia = async (
    item: MediaItem,
    file: File,
    title: string
  ) => {
    if (!file) {
      window.alert(
        "يرجى اختيار ملف جديد."
      );

      return false;
    }

    const newType: MediaType =
      file.type.startsWith("video/")
        ? "video"
        : "image";

    const safeName = file.name
      .toLowerCase()
      .replace(
        /[^a-z0-9._-]/g,
        "-"
      )
      .replace(/-+/g, "-");

    const newPath = `media/${crypto.randomUUID()}-${safeName}`;

    const {
      error: uploadError
    } = await supabase.storage
      .from("site-media")
      .upload(newPath, file, {
        upsert: false,
        contentType: file.type
      });

    if (uploadError) {
      console.error(
        "Replace upload error:",
        uploadError
      );

      window.alert(
        "تعذر رفع الملف الجديد."
      );

      return false;
    }

    const {
      data: publicUrlData
    } = supabase.storage
      .from("site-media")
      .getPublicUrl(newPath);

    const newUrl =
      publicUrlData.publicUrl;

    const { error: updateError } =
      await supabase
        .from("site_media")
        .update({
          title:
            title.trim() ||
            file.name,
          type: newType,
          url: newUrl,
          storage_path: newPath,
          updated_at:
            new Date().toISOString()
        })
        .eq("id", item.id);

    if (updateError) {
      console.error(
        "Update media error:",
        updateError
      );

      await supabase.storage
        .from("site-media")
        .remove([newPath]);

      window.alert(
        "تعذر تحديث بيانات الوسائط."
      );

      return false;
    }

    await supabase.storage
      .from("site-media")
      .remove([
        item.storage_path
      ]);

    setMedia((items) =>
      items.map((mediaItem) =>
        mediaItem.id === item.id
          ? {
              ...mediaItem,
              title:
                title.trim() ||
                file.name,
              type: newType,
              url: newUrl,
              storage_path:
                newPath
            }
          : mediaItem
      )
    );

    return true;
  };

  const updateMediaTitle = async (
    item: MediaItem,
    title: string
  ) => {
    if (!title.trim()) {
      window.alert(
        "يرجى كتابة اسم الوسائط."
      );

      return false;
    }

    const { error } =
      await supabase
        .from("site_media")
        .update({
          title: title.trim(),
          updated_at:
            new Date().toISOString()
        })
        .eq("id", item.id);

    if (error) {
      console.error(
        "Update media title error:",
        error
      );

      window.alert(
        "تعذر تعديل اسم الوسائط."
      );

      return false;
    }

    setMedia((items) =>
      items.map((mediaItem) =>
        mediaItem.id === item.id
          ? {
              ...mediaItem,
              title: title.trim()
            }
          : mediaItem
      )
    );

    return true;
  };

  const deleteMedia = async (
    item: MediaItem
  ) => {
    if (
      !window.confirm(
        `هل تريد حذف "${item.title}"؟`
      )
    ) {
      return;
    }

    const previous = media;

    setMedia((items) =>
      items.filter(
        (mediaItem) =>
          mediaItem.id !== item.id
      )
    );

    const {
      error: deleteRowError
    } = await supabase
      .from("site_media")
      .delete()
      .eq("id", item.id);

    if (deleteRowError) {
      console.error(
        "Delete media row error:",
        deleteRowError
      );

      setMedia(previous);

      window.alert(
        "تعذر حذف الوسائط."
      );

      return;
    }

    const {
      error: storageError
    } = await supabase.storage
      .from("site-media")
      .remove([
        item.storage_path
      ]);

    if (storageError) {
      console.error(
        "Delete media file error:",
        storageError
      );

      window.alert(
        "تم حذف السجل، لكن تعذر حذف الملف من التخزين."
      );
    }
  };

  /* -----------------------------
     INITIAL LOAD
  ----------------------------- */

  useEffect(() => {
    loadBookings();
    loadServices();
    loadMedia();
  }, []);

  /* -----------------------------
     NAVIGATION
  ----------------------------- */

  const menuItems = [
    {
      id: "dashboard",
      title: "لوحة التحكم",
      icon: LayoutDashboard
    },
    {
      id: "bookings",
      title: "طلبات الخدمات",
      icon: CalendarDays
    },
    {
      id: "services",
      title: "الخدمات",
      icon: BarChart3
    },
    {
      id: "content",
      title: "إدارة المحتوى",
      icon: Pencil
    },
    {
      id: "media",
      title: "الصور والفيديو",
      icon: Image
    },
    {
      id: "messages",
      title: "رسائل العملاء",
      icon: MessageCircle
    },
    {
      id: "settings",
      title: "إعدادات الموقع",
      icon: Settings
    }
  ];

  const changePage = (
    page: string
  ) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const openAddService = () => {
    setEditingService(null);
    setShowServiceModal(true);
  };

  const openEditService = (
    service: Service
  ) => {
    setEditingService(service);
    setShowServiceModal(true);
  };

  const openAddMedia = (
    type: MediaType
  ) => {
    setEditingMedia(null);
    setMediaModalType(type);
    setShowMediaModal(true);
  };

  const openEditMedia = (
    item: MediaItem
  ) => {
    setEditingMedia(item);
    setMediaModalType(item.type);
    setShowMediaModal(true);
  };

  return (
    <div
      className="admin-app"
      dir="rtl"
    >
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <aside
        className={
          sidebarOpen
            ? "admin-sidebar open"
            : "admin-sidebar"
        }
      >
        <div className="admin-logo">
          <img
            src="/logo-mark.svg.png"
            alt="الإيثار والأمنيات"
            className="admin-logo-mark-image"
          />

          <div>
            <strong>
              مساحة أعمالك
            </strong>

            <span>
              لوحة الإدارة
            </span>
          </div>
        </div>

        <div className="admin-profile">
          <div className="admin-avatar">
            <UserRound size={20} />
          </div>

          <div>
            <strong>
              مدير الموقع
            </strong>

            <span>
              Administrator
            </span>
          </div>
        </div>

        <nav className="admin-nav">
          <span className="admin-nav-title">
            الإدارة
          </span>

          {menuItems.map(
            (item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={
                    activePage ===
                    item.id
                      ? "admin-nav-item active"
                      : "admin-nav-item"
                  }
                  onClick={() =>
                    changePage(
                      item.id
                    )
                  }
                >
                  <Icon size={19} />
                  <span>
                    {item.title}
                  </span>
                </button>
              );
            }
          )}
        </nav>

        <div className="admin-sidebar-bottom">
          <button
            className="admin-nav-item"
            onClick={async () => {
              await supabase.auth.signOut();

              window.location.replace(
                "/admin/login"
              );
            }}
          >
            <LogOut size={19} />
            <span>
              تسجيل الخروج
            </span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <button
            className="admin-mobile-menu"
            onClick={() =>
              setSidebarOpen(true)
            }
            aria-label="فتح القائمة"
          >
            <Menu size={23} />
          </button>

          <div>
            <h1>
              {
                menuItems.find(
                  (item) =>
                    item.id ===
                    activePage
                )?.title
              }
            </h1>

            <p>
              مرحبًا بك في لوحة إدارة موقعك
            </p>
          </div>

          <a
            href="/"
            className="view-site-button"
          >
            عرض الموقع
            <ChevronLeft size={18} />
          </a>
        </header>

        <div className="admin-content">
          {activePage ===
            "dashboard" && (
            <Dashboard
              bookings={bookings}
              servicesCount={
                services.length
              }
              mediaCount={
                media.length
              }
              onStatusChange={
                updateBookingStatus
              }
              onViewBookings={() =>
                changePage(
                  "bookings"
                )
              }
              onAddService={
                openAddService
              }
              onAddImage={() =>
                openAddMedia(
                  "image"
                )
              }
              onAddVideo={() =>
                openAddMedia(
                  "video"
                )
              }
              onOpenSettings={() =>
                changePage(
                  "settings"
                )
              }
            />
          )}

          {activePage ===
            "bookings" && (
            <BookingsPage
              bookings={bookings}
              loading={
                bookingsLoading
              }
              error={
                bookingsError
              }
              onStatusChange={
                updateBookingStatus
              }
              onRetry={
                loadBookings
              }
            />
          )}

          {activePage ===
            "services" && (
            <ServicesPage
              services={services}
              loading={
                servicesLoading
              }
              error={
                servicesError
              }
              onToggle={
                toggleService
              }
              onDelete={
                deleteService
              }
              onAdd={
                openAddService
              }
              onEdit={
                openEditService
              }
              onRetry={
                loadServices
              }
              onManageFeatures={
                openFeaturesManager
              }
            />
          )}

          {activePage ===
            "content" && (
            <ContentManagement />
          )}

          {activePage ===
            "media" && (
            <MediaPage
              media={media}
              loading={
                mediaLoading
              }
              error={mediaError}
              onAdd={
                openAddMedia
              }
              onEdit={
                openEditMedia
              }
              onDelete={
                deleteMedia
              }
              onRetry={
                loadMedia
              }
            />
          )}

          {activePage ===
            "messages" && (
            <MessagesPage />
          )}

          {activePage ===
            "settings" && (
            <SettingsPage />
          )}
        </div>
      </main>

      {showServiceModal && (
        <ServiceModal
          service={editingService}
          onClose={() => {
            setShowServiceModal(
              false
            );

            setEditingService(
              null
            );
          }}
          onSave={async (
            title,
            description,
            image
          ) => {
            const success =
              await saveService(
                title,
                description,
                image,
                editingService?.id
              );

            if (success) {
              setShowServiceModal(
                false
              );

              setEditingService(
                null
              );
            }
          }}
        />
      )}

      {showFeaturesModal &&
        selectedFeatureService && (
          <ServiceFeaturesModal
            service={
              selectedFeatureService
            }
            features={
              serviceFeatures
            }
            loading={
              featuresLoading
            }
            onClose={
              closeFeaturesManager
            }
            onAdd={() => {
              const title =
                window.prompt(
                  "اكتب اسم الميزة:"
                );

              if (title?.trim()) {
                saveServiceFeature(
                  title.trim()
                );
              }
            }}
            onEdit={(feature) => {
              const title =
                window.prompt(
                  "تعديل اسم الميزة:",
                  feature.title
                );

              if (
                title?.trim() &&
                title.trim() !==
                  feature.title
              ) {
                saveServiceFeature(
                  title.trim(),
                  feature.id
                );
              }
            }}
            onToggle={
              toggleServiceFeature
            }
            onDelete={
              deleteServiceFeature
            }
            onMove={
              moveServiceFeature
            }
          />
        )}

      {showMediaModal && (
        <MediaModal
          type={mediaModalType}
          media={editingMedia}
          onClose={() => {
            setShowMediaModal(
              false
            );

            setEditingMedia(
              null
            );
          }}
          onSave={async (
            file,
            title
          ) => {
            let success = false;

            if (editingMedia) {
              success =
                await replaceMedia(
                  editingMedia,
                  file,
                  title
                );
            } else {
              success =
                await uploadMedia(
                  file,
                  title,
                  mediaModalType
                );
            }

            if (success) {
              setShowMediaModal(
                false
              );

              setEditingMedia(
                null
              );
            }
          }}
          onUpdateTitle={async (
            title
          ) => {
            if (!editingMedia) {
              return false;
            }

            const success =
              await updateMediaTitle(
                editingMedia,
                title
              );

            if (success) {
              setShowMediaModal(
                false
              );

              setEditingMedia(
                null
              );
            }

            return success;
          }}
        />
      )}
    </div>
  );
}

/* =========================================================
   Dashboard
========================================================= */

function Dashboard({
  bookings,
  servicesCount,
  mediaCount,
  onStatusChange,
  onViewBookings,
  onAddService,
  onAddImage,
  onAddVideo,
  onOpenSettings
}: {
  bookings: Booking[];
  servicesCount: number;
  mediaCount: number;
  onStatusChange: (
    id: string,
    status: BookingStatus
  ) => void;
  onViewBookings: () => void;
  onAddService: () => void;
  onAddImage: () => void;
  onAddVideo: () => void;
  onOpenSettings: () => void;
}) {
  const latestBookings =
    bookings.slice(0, 6);

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>
            نظرة عامة
          </h2>

          <p>
            ملخص سريع لحالة الموقع
            والخدمات والطلبات.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="طلبات جديدة"
          value={String(
            bookings.filter(
              (booking) =>
                booking.status ===
                "new"
            ).length
          )}
          icon={<CalendarDays />}
          type="green"
        />

        <StatCard
          title="الخدمات"
          value={String(
            servicesCount
          )}
          icon={<BarChart3 />}
          type="blue"
        />

        <StatCard
          title="رسائل العملاء"
          value="0"
          icon={<Mail />}
          type="gold"
        />

        <StatCard
          title="الصور والفيديو"
          value={String(
            mediaCount
          )}
          icon={<Image />}
          type="purple"
        />
      </div>

      <div className="dashboard-grid">
        <section className="admin-panel">
          <div className="panel-heading">
            <div>
              <h3>
                آخر الطلبات
              </h3>

              <span>
                آخر طلبات الخدمات
              </span>
            </div>

            <button
              onClick={
                onViewBookings
              }
            >
              عرض الكل
              <ChevronLeft size={17} />
            </button>
          </div>

          <div className="table-wrapper">
            {latestBookings.length ===
            0 ? (
              <div className="empty-table">
                لا توجد طلبات خدمات
                حتى الآن.
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>
                      العميل
                    </th>
                    <th>
                      الخدمة
                    </th>
                    <th>
                      التاريخ
                    </th>
                    <th>
                      الحالة
                    </th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {latestBookings.map(
                    (booking) => (
                      <tr
                        key={
                          booking.id
                        }
                      >
                        <td>
                          <div className="customer">
                            <div>
                              <UserRound size={16} />
                            </div>

                            <span>
                              {
                                booking.customer
                              }
                            </span>
                          </div>
                        </td>

                        <td>
                          {
                            booking.service
                          }
                        </td>

                        <td>
                          {
                            booking.date ||
                            "—"
                          }

                          <small>
                            {
                              booking.time ||
                              ""
                            }
                          </small>
                        </td>

                        <td>
                          <StatusBadge
                            status={
                              booking.status
                            }
                          />
                        </td>

                        <td>
                          <select
                            className="status-select"
                            value={
                              booking.status
                            }
                            onChange={(
                              e
                            ) =>
                              onStatusChange(
                                booking.id,
                                e.target
                                  .value as BookingStatus
                              )
                            }
                            aria-label={`تغيير حالة طلب ${booking.customer}`}
                          >
                            <option value="new">
                              جديد
                            </option>

                            <option value="contacted">
                              تم التواصل
                            </option>

                            <option value="confirmed">
                              مؤكد
                            </option>

                            <option value="completed">
                              مكتمل
                            </option>

                            <option value="cancelled">
                              ملغي
                            </option>
                          </select>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <section className="admin-panel quick-panel">
          <div className="panel-heading">
            <div>
              <h3>
                إجراءات سريعة
              </h3>

              <span>
                إدارة الموقع
              </span>
            </div>
          </div>

          <QuickAction
            icon={<Plus />}
            title="إضافة خدمة"
            description="أضف خدمة جديدة للموقع"
            onClick={
              onAddService
            }
          />

          <QuickAction
            icon={<Image />}
            title="رفع صورة"
            description="أضف صورة إلى الموقع"
            onClick={
              onAddImage
            }
          />

          <QuickAction
            icon={<Video />}
            title="إضافة فيديو"
            description="أضف فيديو تعريفي"
            onClick={
              onAddVideo
            }
          />

          <QuickAction
            icon={<Settings />}
            title="إعدادات الموقع"
            description="تحديث معلومات التواصل"
            onClick={
              onOpenSettings
            }
          />
        </section>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  type
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  type: string;
}) {
  return (
    <div className="stat-card">
      <div
        className={`stat-icon ${type}`}
      >
        {icon}
      </div>

      <div>
        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>
      </div>

      <div className="stat-arrow">
        <ChevronLeft size={18} />
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      className="quick-action"
      onClick={onClick}
    >
      <div className="quick-icon">
        {icon}
      </div>

      <div>
        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>
      </div>

      <ChevronLeft size={18} />
    </button>
  );
}

/* =========================================================
   Bookings
========================================================= */

function BookingsPage({
  bookings,
  loading,
  error,
  onStatusChange,
  onRetry
}: {
  bookings: Booking[];
  loading: boolean;
  error: string;
  onStatusChange: (
    id: string,
    status: BookingStatus
  ) => void;
  onRetry: () => void;
}) {
  const [filter, setFilter] =
    useState<
      "all" | BookingStatus
    >("all");

  const [
    selectedBooking,
    setSelectedBooking
  ] =
    useState<Booking | null>(
      null
    );

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter(
          (booking) =>
            booking.status ===
            filter
        );

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>
            طلبات الخدمات
          </h2>

          <p>
            متابعة طلبات وحجوزات العملاء
            وإدارة حالتها.
          </p>
        </div>

        <div className="heading-filter">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as
                  | "all"
                  | BookingStatus
              )
            }
            aria-label="تصفية طلبات الخدمات"
          >
            <option value="all">
              كل الحالات
            </option>

            <option value="new">
              جديد
            </option>

            <option value="contacted">
              تم التواصل
            </option>

            <option value="confirmed">
              مؤكد
            </option>

            <option value="completed">
              مكتمل
            </option>

            <option value="cancelled">
              ملغي
            </option>
          </select>
        </div>
      </div>

      <div className="admin-panel">
        {loading ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <CalendarDays />
            </div>

            <h3>
              جاري تحميل الطلبات
            </h3>

            <p>
              يتم جلب طلبات الخدمات
              من قاعدة البيانات.
            </p>
          </div>
        ) : error ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <X />
            </div>

            <h3>
              {error}
            </h3>

            <p>
              تحقق من اتصال Supabase
              ثم حاول مرة أخرى.
            </p>

            <button
              className="admin-primary-button"
              onClick={onRetry}
            >
              إعادة المحاولة
            </button>
          </div>
        ) : filteredBookings.length ===
          0 ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <CalendarDays />
            </div>

            <h3>
              لا توجد طلبات
            </h3>

            <p>
              لا توجد طلبات خدمات ضمن
              الحالة المحددة حاليًا.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    العميل
                  </th>

                  <th>
                    الجوال
                  </th>

                  <th>
                    الخدمة
                  </th>

                  <th>
                    التاريخ
                  </th>

                  <th>
                    الوقت
                  </th>

                  <th>
                    الحالة
                  </th>

                  <th />
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map(
                  (booking) => (
                    <tr
                      key={
                        booking.id
                      }
                    >
                      <td>
                        <strong>
                          {
                            booking.customer
                          }
                        </strong>
                      </td>

                      <td dir="ltr">
                        {
                          booking.phone
                        }
                      </td>

                      <td>
                        {
                          booking.service
                        }
                      </td>

                      <td>
                        {
                          booking.date ||
                          "—"
                        }
                      </td>

                      <td>
                        {
                          booking.time ||
                          "—"
                        }
                      </td>

                      <td>
                        <select
                          className="status-select"
                          value={
                            booking.status
                          }
                          onChange={(
                            e
                          ) =>
                            onStatusChange(
                              booking.id,
                              e.target
                                .value as BookingStatus
                            )
                          }
                          aria-label={`حالة طلب ${booking.customer}`}
                        >
                          <option value="new">
                            جديد
                          </option>

                          <option value="contacted">
                            تم التواصل
                          </option>

                          <option value="confirmed">
                            مؤكد
                          </option>

                          <option value="completed">
                            مكتمل
                          </option>

                          <option value="cancelled">
                            ملغي
                          </option>
                        </select>
                      </td>

                      <td>
                        <button
                          className="icon-button"
                          onClick={() =>
                            setSelectedBooking(
                              booking
                            )
                          }
                          aria-label="عرض تفاصيل الطلب"
                        >
                          <MoreVertical
                            size={18}
                          />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedBooking && (
        <BookingDetails
          booking={
            selectedBooking
          }
          onClose={() =>
            setSelectedBooking(
              null
            )
          }
          onStatusChange={
            onStatusChange
          }
        />
      )}
    </div>
  );
}

function BookingDetails({
  booking,
  onClose,
  onStatusChange
}: {
  booking: Booking;
  onClose: () => void;
  onStatusChange: (
    id: string,
    status: BookingStatus
  ) => void;
}) {
  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal">
        <button
          className="admin-modal-close"
          onClick={onClose}
          type="button"
          aria-label="إغلاق"
        >
          <X size={20} />
        </button>

        <div className="admin-modal-heading">
          <span>
            تفاصيل الطلب
          </span>

          <h2>
            {booking.service}
          </h2>

          <p>
            تم استلام الطلب في{" "}
            {new Date(
              booking.createdAt
            ).toLocaleString(
              "ar-SA"
            )}
          </p>
        </div>

        <div className="settings-form">
          <label>
            اسم العميل

            <input
              value={
                booking.customer
              }
              readOnly
            />
          </label>

          <label>
            رقم الجوال

            <input
              value={
                booking.phone
              }
              readOnly
              dir="ltr"
            />
          </label>

          <label>
            البريد الإلكتروني

            <input
              value={
                booking.email ||
                "غير مضاف"
              }
              readOnly
              dir="ltr"
            />
          </label>

          <label>
            عدد الأشخاص

            <input
              value={
                booking.people !==
                null
                  ? String(
                      booking.people
                    )
                  : "غير محدد"
              }
              readOnly
            />
          </label>

          <label>
            الموعد

            <input
              value={`${
                booking.date ||
                "غير محدد"
              } — ${
                booking.time ||
                "غير محدد"
              }`}
              readOnly
              dir="ltr"
            />
          </label>

          <label>
            الحالة

            <select
              value={
                booking.status
              }
              onChange={(e) =>
                onStatusChange(
                  booking.id,
                  e.target
                    .value as BookingStatus
                )
              }
            >
              <option value="new">
                جديد
              </option>

              <option value="contacted">
                تم التواصل
              </option>

              <option value="confirmed">
                مؤكد
              </option>

              <option value="completed">
                مكتمل
              </option>

              <option value="cancelled">
                ملغي
              </option>
            </select>
          </label>

          <label>
            الملاحظات

            <textarea
              rows={4}
              value={
                booking.notes ||
                "لا توجد ملاحظات"
              }
              readOnly
            />
          </label>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Services
========================================================= */

function ServicesPage({
  services,
  loading,
  error,
  onToggle,
  onDelete,
  onAdd,
  onEdit,
  onRetry,
  onManageFeatures
}: {
  services: Service[];
  loading: boolean;
  error: string;
  onToggle: (
    id: number
  ) => void;
  onDelete: (
    id: number
  ) => void;
  onAdd: () => void;
  onEdit: (
    service: Service
  ) => void;
  onRetry: () => void;
  onManageFeatures: (
    service: Service
  ) => void;
}) {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>
            الخدمات
          </h2>

          <p>
            إدارة الخدمات التي تظهر
            للعملاء في الموقع.
          </p>
        </div>

        <button
          className="admin-primary-button"
          onClick={onAdd}
        >
          <Plus size={19} />
          إضافة خدمة
        </button>
      </div>

      {loading ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <BarChart3 />
          </div>

          <h3>
            جاري تحميل الخدمات
          </h3>

          <p>
            يتم جلب الخدمات من قاعدة
            البيانات.
          </p>
        </div>
      ) : error ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <X />
          </div>

          <h3>
            {error}
          </h3>

          <button
            className="admin-primary-button"
            onClick={onRetry}
          >
            إعادة المحاولة
          </button>
        </div>
      ) : services.length ===
        0 ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <BarChart3 />
          </div>

          <h3>
            لا توجد خدمات
          </h3>

          <p>
            أضف أول خدمة ليتم عرضها هنا.
          </p>

          <button
            className="admin-primary-button"
            onClick={onAdd}
          >
            <Plus size={18} />
            إضافة خدمة
          </button>
        </div>
      ) : (
        <div className="admin-services-grid">
          {services.map(
            (service) => (
              <div
                className="admin-service-card"
                key={service.id}
              >
                <div className="admin-service-image">
                  {service.image ? (
                    <img
                      src={
                        service.image
                      }
                      alt={
                        service.title
                      }
                    />
                  ) : (
                    <div className="service-image-empty">
                      <Image size={38} />

                      <span>
                        لا توجد صورة
                      </span>
                    </div>
                  )}

                  <span
                    className={
                      service.active
                        ? "active-label"
                        : "inactive-label"
                    }
                  >
                    {service.active
                      ? "نشطة"
                      : "مخفية"}
                  </span>
                </div>

                <div className="admin-service-body">
                  <h3>
                    {
                      service.title
                    }
                  </h3>

                  <p>
                    {service.description ||
                      "لا يوجد وصف لهذه الخدمة."}
                  </p>

                  <div className="service-actions">
                    <button
                      className="edit-button"
                      onClick={() =>
                        onManageFeatures(
                          service
                        )
                      }
                    >
                      <Settings
                        size={16}
                      />

                      المزايا
                    </button>

                    <button
                      className="edit-button"
                      onClick={() =>
                        onEdit(
                          service
                        )
                      }
                    >
                      <Pencil size={16} />

                      تعديل
                    </button>

                    <button
                      className={
                        service.active
                          ? "hide-button"
                          : "show-button"
                      }
                      onClick={() =>
                        onToggle(
                          service.id
                        )
                      }
                    >
                      {service.active
                        ? "إخفاء"
                        : "إظهار"}
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        onDelete(
                          service.id
                        )
                      }
                      aria-label="حذف الخدمة"
                    >
                      <Trash2
                        size={16}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Media
========================================================= */

function MediaPage({
  media,
  loading,
  error,
  onAdd,
  onEdit,
  onDelete,
  onRetry
}: {
  media: MediaItem[];
  loading: boolean;
  error: string;
  onAdd: (
    type: MediaType
  ) => void;
  onEdit: (
    item: MediaItem
  ) => void;
  onDelete: (
    item: MediaItem
  ) => void;
  onRetry: () => void;
}) {
  const [filter, setFilter] =
    useState<
      "all" | MediaType
    >("all");

  const filteredMedia =
    filter === "all"
      ? media
      : media.filter(
          (item) =>
            item.type ===
            filter
        );

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>
            الصور والفيديو
          </h2>

          <p>
            إدارة الصور والفيديوهات
            المستخدمة في الموقع.
          </p>
        </div>

        <div className="media-add-buttons">
          <button
            className="admin-secondary-button"
            onClick={() =>
              onAdd("image")
            }
          >
            <Image size={18} />
            إضافة صورة
          </button>

          <button
            className="admin-primary-button"
            onClick={() =>
              onAdd("video")
            }
          >
            <Video size={18} />
            إضافة فيديو
          </button>
        </div>
      </div>

      <div className="media-tabs">
        <button
          className={
            filter === "all"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("all")
          }
        >
          الكل

          <span>
            {media.length}
          </span>
        </button>

        <button
          className={
            filter === "image"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("image")
          }
        >
          <Image size={17} />

          الصور

          <span>
            {
              media.filter(
                (item) =>
                  item.type ===
                  "image"
              ).length
            }
          </span>
        </button>

        <button
          className={
            filter === "video"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("video")
          }
        >
          <Film size={17} />

          الفيديو

          <span>
            {
              media.filter(
                (item) =>
                  item.type ===
                  "video"
              ).length
            }
          </span>
        </button>
      </div>

      {loading ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <Image />
          </div>

          <h3>
            جاري تحميل الوسائط
          </h3>

          <p>
            يتم جلب الصور والفيديوهات
            من التخزين.
          </p>
        </div>
      ) : error ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <X />
          </div>

          <h3>
            {error}
          </h3>

          <button
            className="admin-primary-button"
            onClick={onRetry}
          >
            إعادة المحاولة
          </button>
        </div>
      ) : filteredMedia.length ===
        0 ? (
        <div className="empty-admin">
          <div className="empty-icon">
            {filter === "video" ? (
              <Video />
            ) : (
              <Image />
            )}
          </div>

          <h3>
            لا توجد وسائط
          </h3>

          <p>
            أضف الصور والفيديوهات التي
            تريد استخدامها في الموقع.
          </p>

          <div className="empty-media-actions">
            <button
              className="admin-secondary-button"
              onClick={() =>
                onAdd("image")
              }
            >
              <Image size={18} />
              إضافة صورة
            </button>

            <button
              className="admin-primary-button"
              onClick={() =>
                onAdd("video")
              }
            >
              <Video size={18} />
              إضافة فيديو
            </button>
          </div>
        </div>
      ) : (
        <div className="media-grid">
          {filteredMedia.map(
            (item) => (
              <div
                className="media-card"
                key={item.id}
              >
                <div className="media-image">
                  {item.type ===
                  "image" ? (
                    <img
                      src={item.url}
                      alt={
                        item.title
                      }
                    />
                  ) : (
                    <video
                      src={item.url}
                      controls
                      preload="metadata"
                    />
                  )}

                  <div className="media-type-label">
                    {item.type ===
                    "image" ? (
                      <>
                        <Image
                          size={14}
                        />
                        صورة
                      </>
                    ) : (
                      <>
                        <Video
                          size={14}
                        />
                        فيديو
                      </>
                    )}
                  </div>

                  <div className="media-actions">
                    <button
                      onClick={() =>
                        onEdit(
                          item
                        )
                      }
                      aria-label="تعديل الوسائط"
                    >
                      <Pencil
                        size={16}
                      />
                    </button>

                    <button
                      className="media-delete"
                      onClick={() =>
                        onDelete(
                          item
                        )
                      }
                      aria-label="حذف الوسائط"
                    >
                      <Trash2
                        size={16}
                      />
                    </button>
                  </div>
                </div>

                <div className="media-info">
                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {item.type ===
                    "image"
                      ? "صورة"
                      : "فيديو"}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Messages
========================================================= */

function MessagesPage() {
  const [messages, setMessages] = useState<
    {
      id: string;
      name: string;
      phone: string;
      email: string | null;
      service_name: string;
      people: number | null;
      requested_date: string | null;
      requested_time: string | null;
      notes: string | null;
      status: string;
      created_at: string;
    }[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedMessage, setSelectedMessage] =
    useState<
      (typeof messages)[number] | null
    >(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("service_requests")
      .select(
        `
          id,
          name,
          phone,
          email,
          service_name,
          people,
          requested_date,
          requested_time,
          notes,
          status,
          created_at
        `
      )
      .order("created_at", {
        ascending: false
      });

    if (error) {
      console.error(
        "Supabase messages error:",
        error
      );

      setLoading(false);
      return;
    }

    setMessages(data ?? []);
    setLoading(false);
  };

  const getStatusLabel = (
    status: string
  ) => {
    switch (status) {
      case "new":
        return "جديد";

      case "contacted":
        return "تم التواصل";

      case "confirmed":
        return "مؤكد";

      case "completed":
        return "مكتمل";

      case "cancelled":
        return "ملغي";

      default:
        return status || "جديد";
    }
  };

  const getStatusClass = (
    status: string
  ) => {
    switch (status) {
      case "new":
        return "status-new";

      case "contacted":
        return "status-contacted";

      case "confirmed":
        return "status-confirmed";

      case "completed":
        return "status-completed";

      case "cancelled":
        return "status-cancelled";

      default:
        return "";
    }
  };

  const formatDate = (
    date: string
  ) => {
    return new Date(date).toLocaleDateString(
      "ar-SA",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );
  };

  const formatTime = (
    time: string | null
  ) => {
    if (!time) {
      return "—";
    }

    return time;
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    const { error } = await supabase
      .from("service_requests")
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);

    if (error) {
      console.error(
        "Supabase message status error:",
        error
      );

      window.alert(
        "تعذر تحديث حالة الطلب."
      );

      return;
    }

    setMessages((current) =>
      current.map((message) =>
        message.id === id
          ? {
              ...message,
              status
            }
          : message
      )
    );

    setSelectedMessage((current) =>
      current && current.id === id
        ? {
            ...current,
            status
          }
        : current
    );
  };

  return (
    <div>

      <div className="page-heading">
        <div>
          <h2>
            رسائل العملاء
          </h2>

          <p>
            الطلبات والاستفسارات الواردة
            من الموقع.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={loadMessages}
        >
          تحديث
        </button>
      </div>

      {loading ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <Mail />
          </div>

          <h3>
            جارٍ تحميل الرسائل...
          </h3>

          <p>
            يرجى الانتظار لحظات.
          </p>
        </div>
      ) : messages.length === 0 ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <Mail />
          </div>

          <h3>
            لا توجد رسائل جديدة
          </h3>

          <p>
            ستظهر طلبات العملاء هنا عند
            إرسالها من الموقع.
          </p>
        </div>
      ) : (
        <div className="admin-panel">

          <div className="panel-heading">
            <div>
              <h3>
                طلبات العملاء
              </h3>

              <span>
                {messages.length} طلب
              </span>
            </div>
          </div>

          <div className="admin-table-wrap">

            <table className="admin-table">

              <thead>
                <tr>

                  <th>
                    العميل
                  </th>

                  <th>
                    الخدمة
                  </th>

                  <th>
                    التاريخ
                  </th>

                  <th>
                    الحالة
                  </th>

                  <th>
                    الإجراء
                  </th>

                </tr>
              </thead>

              <tbody>

                {messages.map(
                  (message) => (
                    <tr key={message.id}>

                      <td>
                        <div className="admin-customer">

                          <strong>
                            {message.name}
                          </strong>

                          <span>
                            {message.phone}
                          </span>

                        </div>
                      </td>

                      <td>
                        {message.service_name}
                      </td>

                      <td>
                        {formatDate(
                          message.created_at
                        )}
                      </td>

                      <td>

                        <select
                          className={`admin-status-select ${getStatusClass(
                            message.status
                          )}`}
                          value={
                            message.status ||
                            "new"
                          }
                          onChange={(event) =>
                            updateStatus(
                              message.id,
                              event.target.value
                            )
                          }
                        >

                          <option value="new">
                            جديد
                          </option>

                          <option value="contacted">
                            تم التواصل
                          </option>

                          <option value="confirmed">
                            مؤكد
                          </option>

                          <option value="completed">
                            مكتمل
                          </option>

                          <option value="cancelled">
                            ملغي
                          </option>

                        </select>

                      </td>

                      <td>

                        <button
                          type="button"
                          className="admin-view-button"
                          onClick={() =>
                            setSelectedMessage(
                              message
                            )
                          }
                        >
                          عرض التفاصيل
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* تفاصيل الرسالة */}
      {selectedMessage && (
        <div
          className="admin-message-overlay"
          onClick={() =>
            setSelectedMessage(null)
          }
        >

          <div
            className="admin-message-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-message-header">

              <div>
                <span>
                  طلب عميل
                </span>

                <h3>
                  {selectedMessage.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(null)
                }
                aria-label="إغلاق"
                className="admin-modal-close"
              >
                ×
              </button>

            </div>

            <div className="admin-message-details">

              <div>
                <span>
                  رقم الجوال
                </span>

                <strong>
                  {selectedMessage.phone}
                </strong>
              </div>

              <div>
                <span>
                  البريد الإلكتروني
                </span>

                <strong>
                  {selectedMessage.email ||
                    "غير مضاف"}
                </strong>
              </div>

              <div>
                <span>
                  الخدمة المطلوبة
                </span>

                <strong>
                  {
                    selectedMessage.service_name
                  }
                </strong>
              </div>

              <div>
                <span>
                  عدد الأشخاص
                </span>

                <strong>
                  {selectedMessage.people ??
                    "غير محدد"}
                </strong>
              </div>

              <div>
                <span>
                  التاريخ المطلوب
                </span>

                <strong>
                  {selectedMessage
                    .requested_date ||
                    "غير محدد"}
                </strong>
              </div>

              <div>
                <span>
                  الوقت المطلوب
                </span>

                <strong>
                  {formatTime(
                    selectedMessage.requested_time
                  )}
                </strong>
              </div>

              <div>
                <span>
                  تاريخ إرسال الطلب
                </span>

                <strong>
                  {formatDate(
                    selectedMessage.created_at
                  )}
                </strong>
              </div>

              <div>
                <span>
                  الحالة
                </span>

                <strong>
                  {getStatusLabel(
                    selectedMessage.status
                  )}
                </strong>
              </div>

            </div>

            <div className="admin-message-notes">

              <span>
                ملاحظات العميل
              </span>

              <p>
                {selectedMessage.notes ||
                  "لا توجد ملاحظات إضافية."}
              </p>

            </div>

            <div className="admin-message-actions">

              <a
                href={`tel:${selectedMessage.phone}`}
                className="admin-primary-button"
              >
                الاتصال بالعميل
              </a>

              {selectedMessage.email && (
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="admin-secondary-button"
                >
                  إرسال بريد
                </a>
              )}

              <a
                href={`https://wa.me/${selectedMessage.phone.replace(
                  /[^0-9]/g,
                  ""
                )}`}
                target="_blank"
                rel="noreferrer"
                className="admin-secondary-button"
              >
                واتساب
              </a>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   Settings
========================================================= */

type SocialLink = {
  id: number;
  platform: string;
  url: string;
  active: boolean;
  sort_order: number;
};

const socialPlatforms = [
  {
    key: "facebook",
    label: "Facebook",
    placeholder: "https://facebook.com/..."
  },
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/..."
  },
  {
    key: "x",
    label: "X",
    placeholder: "https://x.com/..."
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "https://tiktok.com/@..."
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/company/..."
  },
  {
    key: "youtube",
    label: "YouTube",
    placeholder: "https://youtube.com/@..."
  },
  {
    key: "google_maps",
    label: "Google Maps",
    placeholder: "رابط موقع إيثاركو على خرائط Google"
  }
];

function SettingsPage() {
  const [socialLinks, setSocialLinks] =
    useState<SocialLink[]>([]);

  const [loadingSocials, setLoadingSocials] =
    useState(true);

  const [savingSocials, setSavingSocials] =
    useState(false);

  const [socialMessage, setSocialMessage] =
    useState("");

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    setLoadingSocials(true);

    const { data, error } = await supabase
      .from("site_social_links")
      .select(
        "id,platform,url,active,sort_order"
      )
      .order("sort_order", {
        ascending: true
      });

    if (error) {
      console.error(
        "Supabase social links error:",
        error
      );

      setLoadingSocials(false);
      return;
    }

    setSocialLinks(
      (data ?? []) as SocialLink[]
    );

    setLoadingSocials(false);
  };

  const updateSocialUrl = (
    platform: string,
    value: string
  ) => {
    setSocialLinks((current) =>
      current.map((item) =>
        item.platform === platform
          ? {
              ...item,
              url: value
            }
          : item
      )
    );
  };

  const toggleSocial = (
    platform: string
  ) => {
    setSocialLinks((current) =>
      current.map((item) =>
        item.platform === platform
          ? {
              ...item,
              active: !item.active
            }
          : item
      )
    );
  };

  const saveSocialLinks = async () => {
    setSavingSocials(true);
    setSocialMessage("");

    try {
      for (const social of socialLinks) {
        const { error } = await supabase
          .from("site_social_links")
          .update({
            url: social.url.trim(),
            active:
              social.active &&
              social.url.trim().length > 0,
            updated_at: new Date().toISOString()
          })
          .eq("id", social.id);

        if (error) {
          throw error;
        }
      }

      setSocialMessage(
        "تم حفظ روابط التواصل بنجاح."
      );
    } catch (error) {
      console.error(
        "Save social links error:",
        error
      );

      setSocialMessage(
        "تعذر حفظ الروابط. حاول مرة أخرى."
      );
    } finally {
      setSavingSocials(false);
    }
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>
            إعدادات الموقع
          </h2>

          <p>
            معلومات الاتصال والبيانات
            الأساسية للموقع.
          </p>
        </div>
      </div>

      <div className="settings-grid">

        {/* معلومات التواصل */}
        <section className="admin-panel">

          <div className="panel-heading">
            <div>
              <h3>
                معلومات التواصل
              </h3>

              <span>
                ستظهر هذه البيانات في الموقع
              </span>
            </div>
          </div>

          <div className="settings-form">

            <label>
              اسم الموقع

              <input
                defaultValue="إيثاركو"
              />
            </label>

            <label>
              رقم الجوال

              <input
                defaultValue="+966 56 865 7235"
              />
            </label>

            <label>
              رقم واتساب

              <input
                defaultValue="966568657235"
              />
            </label>

            <label>
              البريد الإلكتروني

              <input
                defaultValue="info@example.com"
              />
            </label>

            <label>
              الموقع

              <input
                defaultValue="ينبع الصناعية - حي المرجان"
              />
            </label>

          </div>

          <button
            type="button"
            className="admin-primary-button save-settings"
          >
            حفظ التغييرات
          </button>

        </section>

        {/* روابط التواصل */}
        <section className="admin-panel">

          <div className="panel-heading">
            <div>
              <h3>
                روابط التواصل
              </h3>

              <span>
                حسابات التواصل الاجتماعي
              </span>
            </div>
          </div>

          {loadingSocials ? (
            <div className="admin-empty">
              جاري تحميل روابط التواصل...
            </div>
          ) : (
            <div className="settings-form">

              {socialPlatforms.map(
                (platform) => {
                  const social =
                    socialLinks.find(
                      (item) =>
                        item.platform ===
                        platform.key
                    );

                  if (!social) {
                    return null;
                  }

                  return (
                    <div
                      key={platform.key}
                      className="social-setting-row"
                    >

                      <label>
                        {platform.label}

                        <input
                          type="url"
                          value={social.url}
                          onChange={(event) =>
                            updateSocialUrl(
                              platform.key,
                              event.target.value
                            )
                          }
                          placeholder={
                            platform.placeholder
                          }
                          dir="ltr"
                        />
                      </label>

                      <button
                        type="button"
                        className={
                          social.active
                            ? "social-status active"
                            : "social-status"
                        }
                        onClick={() =>
                          toggleSocial(
                            platform.key
                          )
                        }
                      >
                        {social.active
                          ? "مفعّل"
                          : "متوقف"}
                      </button>

                    </div>
                  );
                }
              )}

              <div className="social-settings-actions">

                <button
                  type="button"
                  className="admin-primary-button"
                  onClick={
                    saveSocialLinks
                  }
                  disabled={savingSocials}
                >
                  {savingSocials
                    ? "جاري الحفظ..."
                    : "حفظ روابط التواصل"}
                </button>

                {socialMessage && (
                  <span
                    className="settings-save-message"
                    role="status"
                  >
                    {socialMessage}
                  </span>
                )}

              </div>

            </div>
          )}

        </section>

      </div>
    </div>
  );
}


/* =========================================================
   Status
========================================================= */

function getStatusLabel(
  status: BookingStatus
) {
  switch (status) {
    case "new":
      return "جديد";

    case "contacted":
      return "تم التواصل";

    case "confirmed":
      return "مؤكد";

    case "completed":
      return "مكتمل";

    case "cancelled":
      return "ملغي";
  }
}

function StatusBadge({
  status
}: {
  status: BookingStatus;
}) {
  const className =
    status === "new"
      ? "status-new"
      : status === "contacted"
      ? "status-contacted"
      : status === "confirmed"
      ? "status-confirmed"
      : status === "completed"
      ? "status-completed"
      : "status-cancelled";

  return (
    <span
      className={`status-badge ${className}`}
    >
      <span />
      {getStatusLabel(status)}
    </span>
  );
}

/* =========================================================
   Service Modal
========================================================= */

function ServiceModal({
  service,
  onClose,
  onSave
}: {
  service: Service | null;
  onClose: () => void;
  onSave: (
    title: string,
    description: string,
    image: string
  ) => Promise<void> | void;
}) {
  const [title, setTitle] =
    useState(
      service?.title || ""
    );

  const [description, setDescription] =
    useState(
      service?.description || ""
    );

  const [image, setImage] =
    useState(
      service?.image || ""
    );

  const [saving, setSaving] =
    useState(false);

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      window.alert(
        "يرجى كتابة اسم الخدمة."
      );

      return;
    }

    setSaving(true);

    try {
      await onSave(
        title,
        description,
        image
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal">
        <button
          className="admin-modal-close"
          onClick={onClose}
          type="button"
          aria-label="إغلاق"
        >
          <X size={20} />
        </button>

        <div className="admin-modal-heading">
          <span>
            {service
              ? "تعديل الخدمة"
              : "خدمة جديدة"}
          </span>

          <h2>
            {service
              ? "تعديل الخدمة"
              : "إضافة خدمة"}
          </h2>

          <p>
            {service
              ? "حدّث بيانات الخدمة ثم احفظ التغييرات."
              : "أضف خدمة جديدة ليتم عرضها في الموقع."}
          </p>
        </div>

        <form onSubmit={submit}>
          <label>
            اسم الخدمة

            <input
              required
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="مثال: قاعة تدريب"
            />
          </label>

          <label>
            وصف الخدمة

            <textarea
              rows={5}
              value={
                description
              }
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="اكتب وصفًا مختصرًا للخدمة..."
            />
          </label>

          <label>
            رابط صورة الخدمة

            <input
              value={image}
              onChange={(e) =>
                setImage(
                  e.target.value
                )
              }
              placeholder="https://..."
              dir="ltr"
            />

            <small className="field-help">
              يمكنك وضع رابط صورة
              مباشرة. يمكن ربطها لاحقًا
              بمكتبة الوسائط.
            </small>
          </label>

          {image && (
            <div className="service-preview">
              <img
                src={image}
                alt="معاينة"
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={saving}
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="admin-primary-button"
              disabled={saving}
            >
              {saving
                ? "جاري الحفظ..."
                : service
                ? "حفظ التعديلات"
                : "حفظ الخدمة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   Service Features Modal
========================================================= */

function ServiceFeaturesModal({
  service,
  features,
  loading,
  onClose,
  onAdd,
  onEdit,
  onToggle,
  onDelete,
  onMove
}: {
  service: Service;
  features: ServiceFeature[];
  loading: boolean;
  onClose: () => void;
  onAdd: () => void;
  onEdit: (
    feature: ServiceFeature
  ) => void;
  onToggle: (
    id: number
  ) => void;
  onDelete: (
    id: number
  ) => void;
  onMove: (
    id: number,
    direction: "up" | "down"
  ) => void;
}) {
  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal">
        <button
          className="admin-modal-close"
          onClick={onClose}
          type="button"
          aria-label="إغلاق"
        >
          <X size={20} />
        </button>

        <div className="admin-modal-heading">
          <span>
            مزايا الخدمة
          </span>

          <h2>
            {service.title}
          </h2>

          <p>
            أضف المزايا التي يحصل عليها
            العميل عند اختيار هذه الخدمة،
            ويمكنك تغيير ترتيب ظهورها.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-start",
            marginBottom: "18px"
          }}
        >
          <button
            className="admin-primary-button"
            type="button"
            onClick={onAdd}
          >
            <Plus size={18} />
            إضافة ميزة
          </button>
        </div>

        {loading ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <Settings />
            </div>

            <h3>
              جاري تحميل المزايا
            </h3>

            <p>
              يتم جلب مزايا الخدمة من
              قاعدة البيانات.
            </p>
          </div>
        ) : features.length ===
          0 ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <Plus />
            </div>

            <h3>
              لا توجد مزايا
            </h3>

            <p>
              أضف المزايا الخاصة بهذه
              الخدمة.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "10px"
            }}
          >
            {features.map(
              (
                feature,
                index
              ) => {
                const isFirst =
                  index === 0;

                const isLast =
                  index ===
                  features.length - 1;

                return (
                  <div
                    key={
                      feature.id
                    }
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: "12px",
                      padding:
                        "14px 16px",
                      border:
                        "1px solid #e6eaf0",
                      borderRadius:
                        "14px",
                      background:
                        feature.active
                          ? "#ffffff"
                          : "#f7f8fa"
                    }}
                  >
                    <strong
                      style={{
                        minWidth:
                          "28px",
                        color:
                          "#64748b",
                        fontSize:
                          "13px"
                      }}
                    >
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </strong>

                    {/* ترتيب الميزة */}
                    <div
                      style={{
                        display:
                          "flex",
                        flexDirection:
                          "column",
                        gap: "3px"
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          onMove(
                            feature.id,
                            "up"
                          )
                        }
                        disabled={
                          isFirst
                        }
                        aria-label="تحريك الميزة للأعلى"
                        title="تحريك للأعلى"
                        style={{
                          width:
                            "30px",
                          height:
                            "27px",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          border:
                            "1px solid #e2e8f0",
                          borderRadius:
                            "7px",
                          background:
                            isFirst
                              ? "#f8fafc"
                              : "#ffffff",
                          color:
                            isFirst
                              ? "#cbd5e1"
                              : "#475569",
                          cursor:
                            isFirst
                              ? "default"
                              : "pointer",
                          opacity:
                            isFirst
                              ? 0.65
                              : 1
                        }}
                      >
                        <ChevronUp
                          size={16}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onMove(
                            feature.id,
                            "down"
                          )
                        }
                        disabled={
                          isLast
                        }
                        aria-label="تحريك الميزة للأسفل"
                        title="تحريك للأسفل"
                        style={{
                          width:
                            "30px",
                          height:
                            "27px",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          border:
                            "1px solid #e2e8f0",
                          borderRadius:
                            "7px",
                          background:
                            isLast
                              ? "#f8fafc"
                              : "#ffffff",
                          color:
                            isLast
                              ? "#cbd5e1"
                              : "#475569",
                          cursor:
                            isLast
                              ? "default"
                              : "pointer",
                          opacity:
                            isLast
                              ? 0.65
                              : 1
                        }}
                      >
                        <ChevronDown
                          size={16}
                        />
                      </button>
                    </div>

                    <div
                      style={{
                        flex: 1,
                        color:
                          feature.active
                            ? "#102a43"
                            : "#94a3b8",
                        fontWeight:
                          700,
                        lineHeight:
                          1.7
                      }}
                    >
                      {
                        feature.title
                      }
                    </div>

                    <button
                      type="button"
                      className={
                        feature.active
                          ? "hide-button"
                          : "show-button"
                      }
                      onClick={() =>
                        onToggle(
                          feature.id
                        )
                      }
                    >
                      {feature.active
                        ? "إخفاء"
                        : "إظهار"}
                    </button>

                    <button
                      type="button"
                      className="edit-button"
                      onClick={() =>
                        onEdit(
                          feature
                        )
                      }
                    >
                      <Pencil
                        size={15}
                      />

                      تعديل
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        onDelete(
                          feature.id
                        )
                      }
                      aria-label="حذف الميزة"
                    >
                      <Trash2
                        size={16}
                      />
                    </button>
                  </div>
                );
              }
            )}
          </div>
        )}

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Media Modal
========================================================= */

function MediaModal({
  type,
  media,
  onClose,
  onSave,
  onUpdateTitle
}: {
  type: MediaType;
  media: MediaItem | null;
  onClose: () => void;
  onSave: (
    file: File,
    title: string
  ) => Promise<void> | void;
  onUpdateTitle: (
    title: string
  ) => Promise<boolean>;
}) {
  const [title, setTitle] =
    useState(
      media?.title || ""
    );

  const [file, setFile] =
    useState<File | null>(
      null
    );

  const [saving, setSaving] =
    useState(false);

  const currentType =
    media?.type || type;

  const accept =
    currentType === "image"
      ? "image/*"
      : "video/*";

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      media &&
      !file
    ) {
      setSaving(true);

      try {
        await onUpdateTitle(
          title
        );
      } finally {
        setSaving(false);
      }

      return;
    }

    if (!file) {
      window.alert(
        "يرجى اختيار ملف."
      );

      return;
    }

    setSaving(true);

    try {
      await onSave(
        file,
        title
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal media-modal">
        <button
          className="admin-modal-close"
          onClick={onClose}
          type="button"
          aria-label="إغلاق"
        >
          <X size={20} />
        </button>

        <div className="admin-modal-heading">
          <span>
            {media
              ? "إدارة الوسائط"
              : currentType ===
                "image"
              ? "صورة جديدة"
              : "فيديو جديد"}
          </span>

          <h2>
            {media
              ? "استبدال أو تعديل الوسائط"
              : currentType ===
                "image"
              ? "إضافة صورة"
              : "إضافة فيديو"}
          </h2>

          <p>
            {media
              ? "يمكنك تعديل الاسم أو اختيار ملف جديد لاستبدال الملف الحالي."
              : "اختر الملف من جهازك ثم احفظه في مكتبة الموقع."}
          </p>
        </div>

        <form onSubmit={submit}>
          <label>
            اسم الوسائط

            <input
              required
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder={
                currentType ===
                "image"
                  ? "مثال: مساحة العمل"
                  : "مثال: فيديو تعريفي"
              }
            />
          </label>

          {media && (
            <div className="current-media-preview">
              <span>
                الملف الحالي
              </span>

              {media.type ===
              "image" ? (
                <img
                  src={media.url}
                  alt={
                    media.title
                  }
                />
              ) : (
                <video
                  src={media.url}
                  controls
                  preload="metadata"
                />
              )}
            </div>
          )}

          <label>
            {media
              ? "الملف الجديد — اختياري"
              : currentType ===
                "image"
              ? "اختيار الصورة"
              : "اختيار الفيديو"}

            <input
              type="file"
              accept={accept}
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] ||
                    null
                )
              }
              className="file-input"
            />
          </label>

          {file && (
            <div className="selected-file">
              <div>
                {currentType ===
                "image" ? (
                  <Image
                    size={19}
                  />
                ) : (
                  <Video
                    size={19}
                  />
                )}
              </div>

              <span>
                {file.name}
              </span>

              <small>
                {(
                  file.size /
                  1024 /
                  1024
                ).toFixed(2)}{" "}
                MB
              </small>
            </div>
          )}

          <div className="media-upload-note">
            <strong>
              ملاحظة:
            </strong>

            <span>
              يتم رفع الملف إلى
              Supabase Storage ولا يتم
              تخزينه داخل قاعدة البيانات.
            </span>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={saving}
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="admin-primary-button"
              disabled={saving}
            >
              {saving
                ? "جاري الحفظ..."
                : media &&
                  !file
                ? "حفظ الاسم"
                : media
                ? "استبدال الملف"
                : "رفع الملف"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminApp;