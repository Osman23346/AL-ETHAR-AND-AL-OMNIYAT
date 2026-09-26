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
        "طھط¹ط°ط± طھط­ظ…ظٹظ„ ط·ظ„ط¨ط§طھ ط§ظ„ط®ط¯ظ…ط§طھ ط­ط§ظ„ظٹظ‹ط§."
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
        "طھط¹ط°ط± طھط­ط¯ظٹط« ط­ط§ظ„ط© ط§ظ„ط·ظ„ط¨. ظٹط±ط¬ظ‰ ط§ظ„ظ…ط­ط§ظˆظ„ط© ظ…ط±ط© ط£ط®ط±ظ‰."
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
        "طھط¹ط°ط± طھط­ظ…ظٹظ„ ط§ظ„ط®ط¯ظ…ط§طھ ط­ط§ظ„ظٹظ‹ط§."
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
        "ظٹط±ط¬ظ‰ ظƒطھط§ط¨ط© ط§ط³ظ… ط§ظ„ط®ط¯ظ…ط©."
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
          "طھط¹ط°ط± طھط­ط¯ظٹط« ط§ظ„ط®ط¯ظ…ط©."
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
        "طھط¹ط°ط± ط¥ط¶ط§ظپط© ط§ظ„ط®ط¯ظ…ط©."
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
        "طھط¹ط°ط± طھط­ط¯ظٹط« ط­ط§ظ„ط© ط§ظ„ط®ط¯ظ…ط©."
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
        `ظ‡ظ„ طھط±ظٹط¯ ط­ط°ظپ ط®ط¯ظ…ط© "${service.title}"طں`
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
        "طھط¹ط°ط± ط­ط°ظپ ط§ظ„ط®ط¯ظ…ط©."
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
        "طھط¹ط°ط± طھط­ظ…ظٹظ„ ظ…ط²ط§ظٹط§ ط§ظ„ط®ط¯ظ…ط©."
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
        "ظٹط±ط¬ظ‰ ظƒطھط§ط¨ط© ط§ط³ظ… ط§ظ„ظ…ظٹط²ط©."
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
          "طھط¹ط°ط± طھط­ط¯ظٹط« ط§ظ„ظ…ظٹط²ط©."
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
        "طھط¹ط°ط± ط¥ط¶ط§ظپط© ط§ظ„ظ…ظٹط²ط©."
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
        "طھط¹ط°ط± طھط­ط¯ظٹط« ط­ط§ظ„ط© ط§ظ„ظ…ظٹط²ط©."
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
        `ظ‡ظ„ طھط±ظٹط¯ ط­ط°ظپ ط§ظ„ظ…ظٹط²ط© "${feature.title}"طں`
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
        "طھط¹ط°ط± ط­ط°ظپ ط§ظ„ظ…ظٹط²ط©."
      );
    }
  };

  /*
   * طھط؛ظٹظٹط± طھط±طھظٹط¨ ط§ظ„ظ…ط²ط§ظٹط§
   * ظٹطھظ… طھط¨ط¯ظٹظ„ sort_order ط¨ظٹظ† ط§ظ„ظ…ظٹط²ط© ط§ظ„ط­ط§ظ„ظٹط©
   * ظˆط§ظ„ظ…ظٹط²ط© ط§ظ„طھظٹ ظ‚ط¨ظ„ظ‡ط§ ط£ظˆ ط¨ط¹ط¯ظ‡ط§.
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
     * ظ†ط؛ظٹظ‘ط± ط§ظ„ظˆط§ط¬ظ‡ط© ظپظˆط±ظ‹ط§ ط­طھظ‰ ظٹط´ط¹ط± ط§ظ„ظ…ط¯ظٹط±
     * ط£ظ† ط§ظ„ط¹ظ…ظ„ظٹط© طھظ…طھ ظ…ط¨ط§ط´ط±ط©.
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
     * طھط­ط¯ظٹط« ط§ظ„ظ…ظٹط²ط© ط§ظ„ط­ط§ظ„ظٹط©
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
        "طھط¹ط°ط± طھط؛ظٹظٹط± طھط±طھظٹط¨ ط§ظ„ظ…ظٹط²ط©."
      );

      return;
    }

    /*
     * طھط­ط¯ظٹط« ط§ظ„ظ…ظٹط²ط© ط§ظ„ط£ط®ط±ظ‰ ط¨ط§ظ„ظ‚ظٹظ…ط© ط§ظ„ظ‚ط¯ظٹظ…ط©
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
        "طھط¹ط°ط± ط­ظپط¸ طھط±طھظٹط¨ ط§ظ„ظ…ظٹط²ط©."
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
        "طھط¹ط°ط± طھط­ظ…ظٹظ„ ط§ظ„طµظˆط± ظˆط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ."
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
        "ظٹط±ط¬ظ‰ ط§ط®طھظٹط§ط± ظ…ظ„ظپ."
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
        "طھط¹ط°ط± ط±ظپط¹ ط§ظ„ظ…ظ„ظپ ط¥ظ„ظ‰ ط§ظ„طھط®ط²ظٹظ†."
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
        "طھظ… ط±ظپط¹ ط§ظ„ظ…ظ„ظپ ظ„ظƒظ† طھط¹ط°ط± طھط³ط¬ظٹظ„ظ‡ ظپظٹ ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ."
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
        "ظٹط±ط¬ظ‰ ط§ط®طھظٹط§ط± ظ…ظ„ظپ ط¬ط¯ظٹط¯."
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
        "طھط¹ط°ط± ط±ظپط¹ ط§ظ„ظ…ظ„ظپ ط§ظ„ط¬ط¯ظٹط¯."
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
        "طھط¹ط°ط± طھط­ط¯ظٹط« ط¨ظٹط§ظ†ط§طھ ط§ظ„ظˆط³ط§ط¦ط·."
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
        "ظٹط±ط¬ظ‰ ظƒطھط§ط¨ط© ط§ط³ظ… ط§ظ„ظˆط³ط§ط¦ط·."
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
        "طھط¹ط°ط± طھط¹ط¯ظٹظ„ ط§ط³ظ… ط§ظ„ظˆط³ط§ط¦ط·."
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
        `ظ‡ظ„ طھط±ظٹط¯ ط­ط°ظپ "${item.title}"طں`
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
        "طھط¹ط°ط± ط­ط°ظپ ط§ظ„ظˆط³ط§ط¦ط·."
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
        "طھظ… ط­ط°ظپ ط§ظ„ط³ط¬ظ„طŒ ظ„ظƒظ† طھط¹ط°ط± ط­ط°ظپ ط§ظ„ظ…ظ„ظپ ظ…ظ† ط§ظ„طھط®ط²ظٹظ†."
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
      title: "ظ„ظˆط­ط© ط§ظ„طھط­ظƒظ…",
      icon: LayoutDashboard
    },
    {
      id: "bookings",
      title: "ط·ظ„ط¨ط§طھ ط§ظ„ط®ط¯ظ…ط§طھ",
      icon: CalendarDays
    },
    {
      id: "services",
      title: "ط§ظ„ط®ط¯ظ…ط§طھ",
      icon: BarChart3
    },
    {
      id: "content",
      title: "ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط­طھظˆظ‰",
      icon: Pencil
    },
    {
      id: "media",
      title: "ط§ظ„طµظˆط± ظˆط§ظ„ظپظٹط¯ظٹظˆ",
      icon: Image
    },
    {
      id: "messages",
      title: "ط±ط³ط§ط¦ظ„ ط§ظ„ط¹ظ…ظ„ط§ط،",
      icon: MessageCircle
    },
    {
      id: "settings",
      title: "ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ…ظˆظ‚ط¹",
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
            src="/brand-logo.png"
            alt="ط§ظ„ط¥ظٹط«ط§ط± ظˆط§ظ„ط£ظ…ظ†ظٹط§طھ"
            className="admin-logo-mark-image"
          />

          <div>
            <strong>
              ظ…ط³ط§ط­ط© ط£ط¹ظ…ط§ظ„ظƒ
            </strong>

            <span>
              ظ„ظˆط­ط© ط§ظ„ط¥ط¯ط§ط±ط©
            </span>
          </div>
        </div>

        <div className="admin-profile">
          <div className="admin-avatar">
            <UserRound size={20} />
          </div>

          <div>
            <strong>
              ظ…ط¯ظٹط± ط§ظ„ظ…ظˆظ‚ط¹
            </strong>

            <span>
              Administrator
            </span>
          </div>
        </div>

        <nav className="admin-nav">
          <span className="admin-nav-title">
            ط§ظ„ط¥ط¯ط§ط±ط©
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
              طھط³ط¬ظٹظ„ ط§ظ„ط®ط±ظˆط¬
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
            aria-label="ظپطھط­ ط§ظ„ظ‚ط§ط¦ظ…ط©"
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
              ظ…ط±ط­ط¨ظ‹ط§ ط¨ظƒ ظپظٹ ظ„ظˆط­ط© ط¥ط¯ط§ط±ط© ظ…ظˆظ‚ط¹ظƒ
            </p>
          </div>

          <a
            href="/"
            className="view-site-button"
          >
            ط¹ط±ط¶ ط§ظ„ظ…ظˆظ‚ط¹
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
                  "ط§ظƒطھط¨ ط§ط³ظ… ط§ظ„ظ…ظٹط²ط©:"
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
                  "طھط¹ط¯ظٹظ„ ط§ط³ظ… ط§ظ„ظ…ظٹط²ط©:",
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
            ظ†ط¸ط±ط© ط¹ط§ظ…ط©
          </h2>

          <p>
            ظ…ظ„ط®طµ ط³ط±ظٹط¹ ظ„ط­ط§ظ„ط© ط§ظ„ظ…ظˆظ‚ط¹
            ظˆط§ظ„ط®ط¯ظ…ط§طھ ظˆط§ظ„ط·ظ„ط¨ط§طھ.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="ط·ظ„ط¨ط§طھ ط¬ط¯ظٹط¯ط©"
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
          title="ط§ظ„ط®ط¯ظ…ط§طھ"
          value={String(
            servicesCount
          )}
          icon={<BarChart3 />}
          type="blue"
        />

        <StatCard
          title="ط±ط³ط§ط¦ظ„ ط§ظ„ط¹ظ…ظ„ط§ط،"
          value="0"
          icon={<Mail />}
          type="gold"
        />

        <StatCard
          title="ط§ظ„طµظˆط± ظˆط§ظ„ظپظٹط¯ظٹظˆ"
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
                ط¢ط®ط± ط§ظ„ط·ظ„ط¨ط§طھ
              </h3>

              <span>
                ط¢ط®ط± ط·ظ„ط¨ط§طھ ط§ظ„ط®ط¯ظ…ط§طھ
              </span>
            </div>

            <button
              onClick={
                onViewBookings
              }
            >
              ط¹ط±ط¶ ط§ظ„ظƒظ„
              <ChevronLeft size={17} />
            </button>
          </div>

          <div className="table-wrapper">
            {latestBookings.length ===
            0 ? (
              <div className="empty-table">
                ظ„ط§ طھظˆط¬ط¯ ط·ظ„ط¨ط§طھ ط®ط¯ظ…ط§طھ
                ط­طھظ‰ ط§ظ„ط¢ظ†.
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>
                      ط§ظ„ط¹ظ…ظٹظ„
                    </th>
                    <th>
                      ط§ظ„ط®ط¯ظ…ط©
                    </th>
                    <th>
                      ط§ظ„طھط§ط±ظٹط®
                    </th>
                    <th>
                      ط§ظ„ط­ط§ظ„ط©
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
                            "â€”"
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
                            aria-label={`طھط؛ظٹظٹط± ط­ط§ظ„ط© ط·ظ„ط¨ ${booking.customer}`}
                          >
                            <option value="new">
                              ط¬ط¯ظٹط¯
                            </option>

                            <option value="contacted">
                              طھظ… ط§ظ„طھظˆط§طµظ„
                            </option>

                            <option value="confirmed">
                              ظ…ط¤ظƒط¯
                            </option>

                            <option value="completed">
                              ظ…ظƒطھظ…ظ„
                            </option>

                            <option value="cancelled">
                              ظ…ظ„ط؛ظٹ
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
                ط¥ط¬ط±ط§ط،ط§طھ ط³ط±ظٹط¹ط©
              </h3>

              <span>
                ط¥ط¯ط§ط±ط© ط§ظ„ظ…ظˆظ‚ط¹
              </span>
            </div>
          </div>

          <QuickAction
            icon={<Plus />}
            title="ط¥ط¶ط§ظپط© ط®ط¯ظ…ط©"
            description="ط£ط¶ظپ ط®ط¯ظ…ط© ط¬ط¯ظٹط¯ط© ظ„ظ„ظ…ظˆظ‚ط¹"
            onClick={
              onAddService
            }
          />

          <QuickAction
            icon={<Image />}
            title="ط±ظپط¹ طµظˆط±ط©"
            description="ط£ط¶ظپ طµظˆط±ط© ط¥ظ„ظ‰ ط§ظ„ظ…ظˆظ‚ط¹"
            onClick={
              onAddImage
            }
          />

          <QuickAction
            icon={<Video />}
            title="ط¥ط¶ط§ظپط© ظپظٹط¯ظٹظˆ"
            description="ط£ط¶ظپ ظپظٹط¯ظٹظˆ طھط¹ط±ظٹظپظٹ"
            onClick={
              onAddVideo
            }
          />

          <QuickAction
            icon={<Settings />}
            title="ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ…ظˆظ‚ط¹"
            description="طھط­ط¯ظٹط« ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„طھظˆط§طµظ„"
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
            ط·ظ„ط¨ط§طھ ط§ظ„ط®ط¯ظ…ط§طھ
          </h2>

          <p>
            ظ…طھط§ط¨ط¹ط© ط·ظ„ط¨ط§طھ ظˆط­ط¬ظˆط²ط§طھ ط§ظ„ط¹ظ…ظ„ط§ط،
            ظˆط¥ط¯ط§ط±ط© ط­ط§ظ„طھظ‡ط§.
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
            aria-label="طھطµظپظٹط© ط·ظ„ط¨ط§طھ ط§ظ„ط®ط¯ظ…ط§طھ"
          >
            <option value="all">
              ظƒظ„ ط§ظ„ط­ط§ظ„ط§طھ
            </option>

            <option value="new">
              ط¬ط¯ظٹط¯
            </option>

            <option value="contacted">
              طھظ… ط§ظ„طھظˆط§طµظ„
            </option>

            <option value="confirmed">
              ظ…ط¤ظƒط¯
            </option>

            <option value="completed">
              ظ…ظƒطھظ…ظ„
            </option>

            <option value="cancelled">
              ظ…ظ„ط؛ظٹ
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
              ط¬ط§ط±ظٹ طھط­ظ…ظٹظ„ ط§ظ„ط·ظ„ط¨ط§طھ
            </h3>

            <p>
              ظٹطھظ… ط¬ظ„ط¨ ط·ظ„ط¨ط§طھ ط§ظ„ط®ط¯ظ…ط§طھ
              ظ…ظ† ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ.
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
              طھط­ظ‚ظ‚ ظ…ظ† ط§طھطµط§ظ„ Supabase
              ط«ظ… ط­ط§ظˆظ„ ظ…ط±ط© ط£ط®ط±ظ‰.
            </p>

            <button
              className="admin-primary-button"
              onClick={onRetry}
            >
              ط¥ط¹ط§ط¯ط© ط§ظ„ظ…ط­ط§ظˆظ„ط©
            </button>
          </div>
        ) : filteredBookings.length ===
          0 ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <CalendarDays />
            </div>

            <h3>
              ظ„ط§ طھظˆط¬ط¯ ط·ظ„ط¨ط§طھ
            </h3>

            <p>
              ظ„ط§ طھظˆط¬ط¯ ط·ظ„ط¨ط§طھ ط®ط¯ظ…ط§طھ ط¶ظ…ظ†
              ط§ظ„ط­ط§ظ„ط© ط§ظ„ظ…ط­ط¯ط¯ط© ط­ط§ظ„ظٹظ‹ط§.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    ط§ظ„ط¹ظ…ظٹظ„
                  </th>

                  <th>
                    ط§ظ„ط¬ظˆط§ظ„
                  </th>

                  <th>
                    ط§ظ„ط®ط¯ظ…ط©
                  </th>

                  <th>
                    ط§ظ„طھط§ط±ظٹط®
                  </th>

                  <th>
                    ط§ظ„ظˆظ‚طھ
                  </th>

                  <th>
                    ط§ظ„ط­ط§ظ„ط©
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
                          "â€”"
                        }
                      </td>

                      <td>
                        {
                          booking.time ||
                          "â€”"
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
                          aria-label={`ط­ط§ظ„ط© ط·ظ„ط¨ ${booking.customer}`}
                        >
                          <option value="new">
                            ط¬ط¯ظٹط¯
                          </option>

                          <option value="contacted">
                            طھظ… ط§ظ„طھظˆط§طµظ„
                          </option>

                          <option value="confirmed">
                            ظ…ط¤ظƒط¯
                          </option>

                          <option value="completed">
                            ظ…ظƒطھظ…ظ„
                          </option>

                          <option value="cancelled">
                            ظ…ظ„ط؛ظٹ
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
                          aria-label="ط¹ط±ط¶ طھظپط§طµظٹظ„ ط§ظ„ط·ظ„ط¨"
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
          aria-label="ط¥ط؛ظ„ط§ظ‚"
        >
          <X size={20} />
        </button>

        <div className="admin-modal-heading">
          <span>
            طھظپط§طµظٹظ„ ط§ظ„ط·ظ„ط¨
          </span>

          <h2>
            {booking.service}
          </h2>

          <p>
            طھظ… ط§ط³طھظ„ط§ظ… ط§ظ„ط·ظ„ط¨ ظپظٹ{" "}
            {new Date(
              booking.createdAt
            ).toLocaleString(
              "ar-SA"
            )}
          </p>
        </div>

        <div className="settings-form">
          <label>
            ط§ط³ظ… ط§ظ„ط¹ظ…ظٹظ„

            <input
              value={
                booking.customer
              }
              readOnly
            />
          </label>

          <label>
            ط±ظ‚ظ… ط§ظ„ط¬ظˆط§ظ„

            <input
              value={
                booking.phone
              }
              readOnly
              dir="ltr"
            />
          </label>

          <label>
            ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ

            <input
              value={
                booking.email ||
                "ط؛ظٹط± ظ…ط¶ط§ظپ"
              }
              readOnly
              dir="ltr"
            />
          </label>

          <label>
            ط¹ط¯ط¯ ط§ظ„ط£ط´ط®ط§طµ

            <input
              value={
                booking.people !==
                null
                  ? String(
                      booking.people
                    )
                  : "ط؛ظٹط± ظ…ط­ط¯ط¯"
              }
              readOnly
            />
          </label>

          <label>
            ط§ظ„ظ…ظˆط¹ط¯

            <input
              value={`${
                booking.date ||
                "ط؛ظٹط± ظ…ط­ط¯ط¯"
              } â€” ${
                booking.time ||
                "ط؛ظٹط± ظ…ط­ط¯ط¯"
              }`}
              readOnly
              dir="ltr"
            />
          </label>

          <label>
            ط§ظ„ط­ط§ظ„ط©

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
                ط¬ط¯ظٹط¯
              </option>

              <option value="contacted">
                طھظ… ط§ظ„طھظˆط§طµظ„
              </option>

              <option value="confirmed">
                ظ…ط¤ظƒط¯
              </option>

              <option value="completed">
                ظ…ظƒطھظ…ظ„
              </option>

              <option value="cancelled">
                ظ…ظ„ط؛ظٹ
              </option>
            </select>
          </label>

          <label>
            ط§ظ„ظ…ظ„ط§ط­ط¸ط§طھ

            <textarea
              rows={4}
              value={
                booking.notes ||
                "ظ„ط§ طھظˆط¬ط¯ ظ…ظ„ط§ط­ط¸ط§طھ"
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
            ط¥ط؛ظ„ط§ظ‚
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
            ط§ظ„ط®ط¯ظ…ط§طھ
          </h2>

          <p>
            ط¥ط¯ط§ط±ط© ط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„طھظٹ طھط¸ظ‡ط±
            ظ„ظ„ط¹ظ…ظ„ط§ط، ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹.
          </p>
        </div>

        <button
          className="admin-primary-button"
          onClick={onAdd}
        >
          <Plus size={19} />
          ط¥ط¶ط§ظپط© ط®ط¯ظ…ط©
        </button>
      </div>

      {loading ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <BarChart3 />
          </div>

          <h3>
            ط¬ط§ط±ظٹ طھط­ظ…ظٹظ„ ط§ظ„ط®ط¯ظ…ط§طھ
          </h3>

          <p>
            ظٹطھظ… ط¬ظ„ط¨ ط§ظ„ط®ط¯ظ…ط§طھ ظ…ظ† ظ‚ط§ط¹ط¯ط©
            ط§ظ„ط¨ظٹط§ظ†ط§طھ.
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
            ط¥ط¹ط§ط¯ط© ط§ظ„ظ…ط­ط§ظˆظ„ط©
          </button>
        </div>
      ) : services.length ===
        0 ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <BarChart3 />
          </div>

          <h3>
            ظ„ط§ طھظˆط¬ط¯ ط®ط¯ظ…ط§طھ
          </h3>

          <p>
            ط£ط¶ظپ ط£ظˆظ„ ط®ط¯ظ…ط© ظ„ظٹطھظ… ط¹ط±ط¶ظ‡ط§ ظ‡ظ†ط§.
          </p>

          <button
            className="admin-primary-button"
            onClick={onAdd}
          >
            <Plus size={18} />
            ط¥ط¶ط§ظپط© ط®ط¯ظ…ط©
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
                        ظ„ط§ طھظˆط¬ط¯ طµظˆط±ط©
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
                      ? "ظ†ط´ط·ط©"
                      : "ظ…ط®ظپظٹط©"}
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
                      "ظ„ط§ ظٹظˆط¬ط¯ ظˆطµظپ ظ„ظ‡ط°ظ‡ ط§ظ„ط®ط¯ظ…ط©."}
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

                      ط§ظ„ظ…ط²ط§ظٹط§
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

                      طھط¹ط¯ظٹظ„
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
                        ? "ط¥ط®ظپط§ط،"
                        : "ط¥ط¸ظ‡ط§ط±"}
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        onDelete(
                          service.id
                        )
                      }
                      aria-label="ط­ط°ظپ ط§ظ„ط®ط¯ظ…ط©"
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
            ط§ظ„طµظˆط± ظˆط§ظ„ظپظٹط¯ظٹظˆ
          </h2>

          <p>
            ط¥ط¯ط§ط±ط© ط§ظ„طµظˆط± ظˆط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ
            ط§ظ„ظ…ط³طھط®ط¯ظ…ط© ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹.
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
            ط¥ط¶ط§ظپط© طµظˆط±ط©
          </button>

          <button
            className="admin-primary-button"
            onClick={() =>
              onAdd("video")
            }
          >
            <Video size={18} />
            ط¥ط¶ط§ظپط© ظپظٹط¯ظٹظˆ
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
          ط§ظ„ظƒظ„

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

          ط§ظ„طµظˆط±

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

          ط§ظ„ظپظٹط¯ظٹظˆ

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
            ط¬ط§ط±ظٹ طھط­ظ…ظٹظ„ ط§ظ„ظˆط³ط§ط¦ط·
          </h3>

          <p>
            ظٹطھظ… ط¬ظ„ط¨ ط§ظ„طµظˆط± ظˆط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ
            ظ…ظ† ط§ظ„طھط®ط²ظٹظ†.
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
            ط¥ط¹ط§ط¯ط© ط§ظ„ظ…ط­ط§ظˆظ„ط©
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
            ظ„ط§ طھظˆط¬ط¯ ظˆط³ط§ط¦ط·
          </h3>

          <p>
            ط£ط¶ظپ ط§ظ„طµظˆط± ظˆط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ ط§ظ„طھظٹ
            طھط±ظٹط¯ ط§ط³طھط®ط¯ط§ظ…ظ‡ط§ ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹.
          </p>

          <div className="empty-media-actions">
            <button
              className="admin-secondary-button"
              onClick={() =>
                onAdd("image")
              }
            >
              <Image size={18} />
              ط¥ط¶ط§ظپط© طµظˆط±ط©
            </button>

            <button
              className="admin-primary-button"
              onClick={() =>
                onAdd("video")
              }
            >
              <Video size={18} />
              ط¥ط¶ط§ظپط© ظپظٹط¯ظٹظˆ
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
                        طµظˆط±ط©
                      </>
                    ) : (
                      <>
                        <Video
                          size={14}
                        />
                        ظپظٹط¯ظٹظˆ
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
                      aria-label="طھط¹ط¯ظٹظ„ ط§ظ„ظˆط³ط§ط¦ط·"
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
                      aria-label="ط­ط°ظپ ط§ظ„ظˆط³ط§ط¦ط·"
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
                      ? "طµظˆط±ط©"
                      : "ظپظٹط¯ظٹظˆ"}
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
        return "ط¬ط¯ظٹط¯";

      case "contacted":
        return "طھظ… ط§ظ„طھظˆط§طµظ„";

      case "confirmed":
        return "ظ…ط¤ظƒط¯";

      case "completed":
        return "ظ…ظƒطھظ…ظ„";

      case "cancelled":
        return "ظ…ظ„ط؛ظٹ";

      default:
        return status || "ط¬ط¯ظٹط¯";
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
      return "â€”";
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
        "طھط¹ط°ط± طھط­ط¯ظٹط« ط­ط§ظ„ط© ط§ظ„ط·ظ„ط¨."
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
            ط±ط³ط§ط¦ظ„ ط§ظ„ط¹ظ…ظ„ط§ط،
          </h2>

          <p>
            ط§ظ„ط·ظ„ط¨ط§طھ ظˆط§ظ„ط§ط³طھظپط³ط§ط±ط§طھ ط§ظ„ظˆط§ط±ط¯ط©
            ظ…ظ† ط§ظ„ظ…ظˆظ‚ط¹.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={loadMessages}
        >
          طھط­ط¯ظٹط«
        </button>
      </div>

      {loading ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <Mail />
          </div>

          <h3>
            ط¬ط§ط±ظچ طھط­ظ…ظٹظ„ ط§ظ„ط±ط³ط§ط¦ظ„...
          </h3>

          <p>
            ظٹط±ط¬ظ‰ ط§ظ„ط§ظ†طھط¸ط§ط± ظ„ط­ط¸ط§طھ.
          </p>
        </div>
      ) : messages.length === 0 ? (
        <div className="empty-admin">
          <div className="empty-icon">
            <Mail />
          </div>

          <h3>
            ظ„ط§ طھظˆط¬ط¯ ط±ط³ط§ط¦ظ„ ط¬ط¯ظٹط¯ط©
          </h3>

          <p>
            ط³طھط¸ظ‡ط± ط·ظ„ط¨ط§طھ ط§ظ„ط¹ظ…ظ„ط§ط، ظ‡ظ†ط§ ط¹ظ†ط¯
            ط¥ط±ط³ط§ظ„ظ‡ط§ ظ…ظ† ط§ظ„ظ…ظˆظ‚ط¹.
          </p>
        </div>
      ) : (
        <div className="admin-panel">

          <div className="panel-heading">
            <div>
              <h3>
                ط·ظ„ط¨ط§طھ ط§ظ„ط¹ظ…ظ„ط§ط،
              </h3>

              <span>
                {messages.length} ط·ظ„ط¨
              </span>
            </div>
          </div>

          <div className="admin-table-wrap">

            <table className="admin-table">

              <thead>
                <tr>

                  <th>
                    ط§ظ„ط¹ظ…ظٹظ„
                  </th>

                  <th>
                    ط§ظ„ط®ط¯ظ…ط©
                  </th>

                  <th>
                    ط§ظ„طھط§ط±ظٹط®
                  </th>

                  <th>
                    ط§ظ„ط­ط§ظ„ط©
                  </th>

                  <th>
                    ط§ظ„ط¥ط¬ط±ط§ط،
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
                            ط¬ط¯ظٹط¯
                          </option>

                          <option value="contacted">
                            طھظ… ط§ظ„طھظˆط§طµظ„
                          </option>

                          <option value="confirmed">
                            ظ…ط¤ظƒط¯
                          </option>

                          <option value="completed">
                            ظ…ظƒطھظ…ظ„
                          </option>

                          <option value="cancelled">
                            ظ…ظ„ط؛ظٹ
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
                          ط¹ط±ط¶ ط§ظ„طھظپط§طµظٹظ„
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

      {/* طھظپط§طµظٹظ„ ط§ظ„ط±ط³ط§ظ„ط© */}
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
                  ط·ظ„ط¨ ط¹ظ…ظٹظ„
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
                aria-label="ط¥ط؛ظ„ط§ظ‚"
                className="admin-modal-close"
              >
                أ—
              </button>

            </div>

            <div className="admin-message-details">

              <div>
                <span>
                  ط±ظ‚ظ… ط§ظ„ط¬ظˆط§ظ„
                </span>

                <strong>
                  {selectedMessage.phone}
                </strong>
              </div>

              <div>
                <span>
                  ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ
                </span>

                <strong>
                  {selectedMessage.email ||
                    "ط؛ظٹط± ظ…ط¶ط§ظپ"}
                </strong>
              </div>

              <div>
                <span>
                  ط§ظ„ط®ط¯ظ…ط© ط§ظ„ظ…ط·ظ„ظˆط¨ط©
                </span>

                <strong>
                  {
                    selectedMessage.service_name
                  }
                </strong>
              </div>

              <div>
                <span>
                  ط¹ط¯ط¯ ط§ظ„ط£ط´ط®ط§طµ
                </span>

                <strong>
                  {selectedMessage.people ??
                    "ط؛ظٹط± ظ…ط­ط¯ط¯"}
                </strong>
              </div>

              <div>
                <span>
                  ط§ظ„طھط§ط±ظٹط® ط§ظ„ظ…ط·ظ„ظˆط¨
                </span>

                <strong>
                  {selectedMessage
                    .requested_date ||
                    "ط؛ظٹط± ظ…ط­ط¯ط¯"}
                </strong>
              </div>

              <div>
                <span>
                  ط§ظ„ظˆظ‚طھ ط§ظ„ظ…ط·ظ„ظˆط¨
                </span>

                <strong>
                  {formatTime(
                    selectedMessage.requested_time
                  )}
                </strong>
              </div>

              <div>
                <span>
                  طھط§ط±ظٹط® ط¥ط±ط³ط§ظ„ ط§ظ„ط·ظ„ط¨
                </span>

                <strong>
                  {formatDate(
                    selectedMessage.created_at
                  )}
                </strong>
              </div>

              <div>
                <span>
                  ط§ظ„ط­ط§ظ„ط©
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
                ظ…ظ„ط§ط­ط¸ط§طھ ط§ظ„ط¹ظ…ظٹظ„
              </span>

              <p>
                {selectedMessage.notes ||
                  "ظ„ط§ طھظˆط¬ط¯ ظ…ظ„ط§ط­ط¸ط§طھ ط¥ط¶ط§ظپظٹط©."}
              </p>

            </div>

            <div className="admin-message-actions">

              <a
                href={`tel:${selectedMessage.phone}`}
                className="admin-primary-button"
              >
                ط§ظ„ط§طھطµط§ظ„ ط¨ط§ظ„ط¹ظ…ظٹظ„
              </a>

              {selectedMessage.email && (
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="admin-secondary-button"
                >
                  ط¥ط±ط³ط§ظ„ ط¨ط±ظٹط¯
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
                ظˆط§طھط³ط§ط¨
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
    placeholder: "ط±ط§ط¨ط· ظ…ظˆظ‚ط¹ ط¥ظٹط«ط§ط±ظƒظˆ ط¹ظ„ظ‰ ط®ط±ط§ط¦ط· Google"
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
        "طھظ… ط­ظپط¸ ط±ظˆط§ط¨ط· ط§ظ„طھظˆط§طµظ„ ط¨ظ†ط¬ط§ط­."
      );
    } catch (error) {
      console.error(
        "Save social links error:",
        error
      );

      setSocialMessage(
        "طھط¹ط°ط± ط­ظپط¸ ط§ظ„ط±ظˆط§ط¨ط·. ط­ط§ظˆظ„ ظ…ط±ط© ط£ط®ط±ظ‰."
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
            ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ…ظˆظ‚ط¹
          </h2>

          <p>
            ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط§طھطµط§ظ„ ظˆط§ظ„ط¨ظٹط§ظ†ط§طھ
            ط§ظ„ط£ط³ط§ط³ظٹط© ظ„ظ„ظ…ظˆظ‚ط¹.
          </p>
        </div>
      </div>

      <div className="settings-grid">

        {/* ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„طھظˆط§طµظ„ */}
        <section className="admin-panel">

          <div className="panel-heading">
            <div>
              <h3>
                ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„طھظˆط§طµظ„
              </h3>

              <span>
                ط³طھط¸ظ‡ط± ظ‡ط°ظ‡ ط§ظ„ط¨ظٹط§ظ†ط§طھ ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹
              </span>
            </div>
          </div>

          <div className="settings-form">

            <label>
              ط§ط³ظ… ط§ظ„ظ…ظˆظ‚ط¹

              <input
                defaultValue="ط¥ظٹط«ط§ط±ظƒظˆ"
              />
            </label>

            <label>
              ط±ظ‚ظ… ط§ظ„ط¬ظˆط§ظ„

              <input
                defaultValue="+966 56 865 7235"
              />
            </label>

            <label>
              ط±ظ‚ظ… ظˆط§طھط³ط§ط¨

              <input
                defaultValue="966568657235"
              />
            </label>

            <label>
              ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ

              <input
                defaultValue="info@example.com"
              />
            </label>

            <label>
              ط§ظ„ظ…ظˆظ‚ط¹

              <input
                defaultValue="ظٹظ†ط¨ط¹ ط§ظ„طµظ†ط§ط¹ظٹط© - ط­ظٹ ط§ظ„ظ…ط±ط¬ط§ظ†"
              />
            </label>

          </div>

          <button
            type="button"
            className="admin-primary-button save-settings"
          >
            ط­ظپط¸ ط§ظ„طھط؛ظٹظٹط±ط§طھ
          </button>

        </section>

        {/* ط±ظˆط§ط¨ط· ط§ظ„طھظˆط§طµظ„ */}
        <section className="admin-panel">

          <div className="panel-heading">
            <div>
              <h3>
                ط±ظˆط§ط¨ط· ط§ظ„طھظˆط§طµظ„
              </h3>

              <span>
                ط­ط³ط§ط¨ط§طھ ط§ظ„طھظˆط§طµظ„ ط§ظ„ط§ط¬طھظ…ط§ط¹ظٹ
              </span>
            </div>
          </div>

          {loadingSocials ? (
            <div className="admin-empty">
              ط¬ط§ط±ظٹ طھط­ظ…ظٹظ„ ط±ظˆط§ط¨ط· ط§ظ„طھظˆط§طµظ„...
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
                          ? "ظ…ظپط¹ظ‘ظ„"
                          : "ظ…طھظˆظ‚ظپ"}
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
                    ? "ط¬ط§ط±ظٹ ط§ظ„ط­ظپط¸..."
                    : "ط­ظپط¸ ط±ظˆط§ط¨ط· ط§ظ„طھظˆط§طµظ„"}
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
      return "ط¬ط¯ظٹط¯";

    case "contacted":
      return "طھظ… ط§ظ„طھظˆط§طµظ„";

    case "confirmed":
      return "ظ…ط¤ظƒط¯";

    case "completed":
      return "ظ…ظƒطھظ…ظ„";

    case "cancelled":
      return "ظ…ظ„ط؛ظٹ";
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
        "ظٹط±ط¬ظ‰ ظƒطھط§ط¨ط© ط§ط³ظ… ط§ظ„ط®ط¯ظ…ط©."
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
          aria-label="ط¥ط؛ظ„ط§ظ‚"
        >
          <X size={20} />
        </button>

        <div className="admin-modal-heading">
          <span>
            {service
              ? "طھط¹ط¯ظٹظ„ ط§ظ„ط®ط¯ظ…ط©"
              : "ط®ط¯ظ…ط© ط¬ط¯ظٹط¯ط©"}
          </span>

          <h2>
            {service
              ? "طھط¹ط¯ظٹظ„ ط§ظ„ط®ط¯ظ…ط©"
              : "ط¥ط¶ط§ظپط© ط®ط¯ظ…ط©"}
          </h2>

          <p>
            {service
              ? "ط­ط¯ظ‘ط« ط¨ظٹط§ظ†ط§طھ ط§ظ„ط®ط¯ظ…ط© ط«ظ… ط§ط­ظپط¸ ط§ظ„طھط؛ظٹظٹط±ط§طھ."
              : "ط£ط¶ظپ ط®ط¯ظ…ط© ط¬ط¯ظٹط¯ط© ظ„ظٹطھظ… ط¹ط±ط¶ظ‡ط§ ظپظٹ ط§ظ„ظ…ظˆظ‚ط¹."}
          </p>
        </div>

        <form onSubmit={submit}>
          <label>
            ط§ط³ظ… ط§ظ„ط®ط¯ظ…ط©

            <input
              required
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="ظ…ط«ط§ظ„: ظ‚ط§ط¹ط© طھط¯ط±ظٹط¨"
            />
          </label>

          <label>
            ظˆطµظپ ط§ظ„ط®ط¯ظ…ط©

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
              placeholder="ط§ظƒطھط¨ ظˆطµظپظ‹ط§ ظ…ط®طھطµط±ظ‹ط§ ظ„ظ„ط®ط¯ظ…ط©..."
            />
          </label>

          <label>
            ط±ط§ط¨ط· طµظˆط±ط© ط§ظ„ط®ط¯ظ…ط©

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
              ظٹظ…ظƒظ†ظƒ ظˆط¶ط¹ ط±ط§ط¨ط· طµظˆط±ط©
              ظ…ط¨ط§ط´ط±ط©. ظٹظ…ظƒظ† ط±ط¨ط·ظ‡ط§ ظ„ط§ط­ظ‚ظ‹ط§
              ط¨ظ…ظƒطھط¨ط© ط§ظ„ظˆط³ط§ط¦ط·.
            </small>
          </label>

          {image && (
            <div className="service-preview">
              <img
                src={image}
                alt="ظ…ط¹ط§ظٹظ†ط©"
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
              ط¥ظ„ط؛ط§ط،
            </button>

            <button
              type="submit"
              className="admin-primary-button"
              disabled={saving}
            >
              {saving
                ? "ط¬ط§ط±ظٹ ط§ظ„ط­ظپط¸..."
                : service
                ? "ط­ظپط¸ ط§ظ„طھط¹ط¯ظٹظ„ط§طھ"
                : "ط­ظپط¸ ط§ظ„ط®ط¯ظ…ط©"}
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
          aria-label="ط¥ط؛ظ„ط§ظ‚"
        >
          <X size={20} />
        </button>

        <div className="admin-modal-heading">
          <span>
            ظ…ط²ط§ظٹط§ ط§ظ„ط®ط¯ظ…ط©
          </span>

          <h2>
            {service.title}
          </h2>

          <p>
            ط£ط¶ظپ ط§ظ„ظ…ط²ط§ظٹط§ ط§ظ„طھظٹ ظٹط­طµظ„ ط¹ظ„ظٹظ‡ط§
            ط§ظ„ط¹ظ…ظٹظ„ ط¹ظ†ط¯ ط§ط®طھظٹط§ط± ظ‡ط°ظ‡ ط§ظ„ط®ط¯ظ…ط©طŒ
            ظˆظٹظ…ظƒظ†ظƒ طھط؛ظٹظٹط± طھط±طھظٹط¨ ط¸ظ‡ظˆط±ظ‡ط§.
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
            ط¥ط¶ط§ظپط© ظ…ظٹط²ط©
          </button>
        </div>

        {loading ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <Settings />
            </div>

            <h3>
              ط¬ط§ط±ظٹ طھط­ظ…ظٹظ„ ط§ظ„ظ…ط²ط§ظٹط§
            </h3>

            <p>
              ظٹطھظ… ط¬ظ„ط¨ ظ…ط²ط§ظٹط§ ط§ظ„ط®ط¯ظ…ط© ظ…ظ†
              ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ.
            </p>
          </div>
        ) : features.length ===
          0 ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <Plus />
            </div>

            <h3>
              ظ„ط§ طھظˆط¬ط¯ ظ…ط²ط§ظٹط§
            </h3>

            <p>
              ط£ط¶ظپ ط§ظ„ظ…ط²ط§ظٹط§ ط§ظ„ط®ط§طµط© ط¨ظ‡ط°ظ‡
              ط§ظ„ط®ط¯ظ…ط©.
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

                    {/* طھط±طھظٹط¨ ط§ظ„ظ…ظٹط²ط© */}
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
                        aria-label="طھط­ط±ظٹظƒ ط§ظ„ظ…ظٹط²ط© ظ„ظ„ط£ط¹ظ„ظ‰"
                        title="طھط­ط±ظٹظƒ ظ„ظ„ط£ط¹ظ„ظ‰"
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
                        aria-label="طھط­ط±ظٹظƒ ط§ظ„ظ…ظٹط²ط© ظ„ظ„ط£ط³ظپظ„"
                        title="طھط­ط±ظٹظƒ ظ„ظ„ط£ط³ظپظ„"
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
                        ? "ط¥ط®ظپط§ط،"
                        : "ط¥ط¸ظ‡ط§ط±"}
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

                      طھط¹ط¯ظٹظ„
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        onDelete(
                          feature.id
                        )
                      }
                      aria-label="ط­ط°ظپ ط§ظ„ظ…ظٹط²ط©"
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
            ط¥ط؛ظ„ط§ظ‚
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
        "ظٹط±ط¬ظ‰ ط§ط®طھظٹط§ط± ظ…ظ„ظپ."
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
          aria-label="ط¥ط؛ظ„ط§ظ‚"
        >
          <X size={20} />
        </button>

        <div className="admin-modal-heading">
          <span>
            {media
              ? "ط¥ط¯ط§ط±ط© ط§ظ„ظˆط³ط§ط¦ط·"
              : currentType ===
                "image"
              ? "طµظˆط±ط© ط¬ط¯ظٹط¯ط©"
              : "ظپظٹط¯ظٹظˆ ط¬ط¯ظٹط¯"}
          </span>

          <h2>
            {media
              ? "ط§ط³طھط¨ط¯ط§ظ„ ط£ظˆ طھط¹ط¯ظٹظ„ ط§ظ„ظˆط³ط§ط¦ط·"
              : currentType ===
                "image"
              ? "ط¥ط¶ط§ظپط© طµظˆط±ط©"
              : "ط¥ط¶ط§ظپط© ظپظٹط¯ظٹظˆ"}
          </h2>

          <p>
            {media
              ? "ظٹظ…ظƒظ†ظƒ طھط¹ط¯ظٹظ„ ط§ظ„ط§ط³ظ… ط£ظˆ ط§ط®طھظٹط§ط± ظ…ظ„ظپ ط¬ط¯ظٹط¯ ظ„ط§ط³طھط¨ط¯ط§ظ„ ط§ظ„ظ…ظ„ظپ ط§ظ„ط­ط§ظ„ظٹ."
              : "ط§ط®طھط± ط§ظ„ظ…ظ„ظپ ظ…ظ† ط¬ظ‡ط§ط²ظƒ ط«ظ… ط§ط­ظپط¸ظ‡ ظپظٹ ظ…ظƒطھط¨ط© ط§ظ„ظ…ظˆظ‚ط¹."}
          </p>
        </div>

        <form onSubmit={submit}>
          <label>
            ط§ط³ظ… ط§ظ„ظˆط³ط§ط¦ط·

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
                  ? "ظ…ط«ط§ظ„: ظ…ط³ط§ط­ط© ط§ظ„ط¹ظ…ظ„"
                  : "ظ…ط«ط§ظ„: ظپظٹط¯ظٹظˆ طھط¹ط±ظٹظپظٹ"
              }
            />
          </label>

          {media && (
            <div className="current-media-preview">
              <span>
                ط§ظ„ظ…ظ„ظپ ط§ظ„ط­ط§ظ„ظٹ
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
              ? "ط§ظ„ظ…ظ„ظپ ط§ظ„ط¬ط¯ظٹط¯ â€” ط§ط®طھظٹط§ط±ظٹ"
              : currentType ===
                "image"
              ? "ط§ط®طھظٹط§ط± ط§ظ„طµظˆط±ط©"
              : "ط§ط®طھظٹط§ط± ط§ظ„ظپظٹط¯ظٹظˆ"}

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
              ظ…ظ„ط§ط­ط¸ط©:
            </strong>

            <span>
              ظٹطھظ… ط±ظپط¹ ط§ظ„ظ…ظ„ظپ ط¥ظ„ظ‰
              Supabase Storage ظˆظ„ط§ ظٹطھظ…
              طھط®ط²ظٹظ†ظ‡ ط¯ط§ط®ظ„ ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ.
            </span>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={saving}
            >
              ط¥ظ„ط؛ط§ط،
            </button>

            <button
              type="submit"
              className="admin-primary-button"
              disabled={saving}
            >
              {saving
                ? "ط¬ط§ط±ظٹ ط§ظ„ط­ظپط¸..."
                : media &&
                  !file
                ? "ط­ظپط¸ ط§ظ„ط§ط³ظ…"
                : media
                ? "ط§ط³طھط¨ط¯ط§ظ„ ط§ظ„ظ…ظ„ظپ"
                : "ط±ظپط¹ ط§ظ„ظ…ظ„ظپ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminApp;
