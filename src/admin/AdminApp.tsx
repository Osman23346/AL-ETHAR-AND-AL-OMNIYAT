import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
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

const initialServices: Service[] = [
  {
    id: 1,
    title: "مساحات عمل مرنة",
    description:
      "مساحات عملية واحترافية تناسب العمل الفردي والفرق الصغيرة.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    active: true
  },
  {
    id: 2,
    title: "قاعات اجتماعات",
    description:
      "قاعات مجهزة للاجتماعات والعروض واللقاءات المهنية.",
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80",
    active: true
  },
  {
    id: 3,
    title: "مكاتب خاصة",
    description:
      "مكاتب خاصة تمنحك الخصوصية والراحة في بيئة عمل احترافية.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
    active: true
  }
];

function AdminApp() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [services, setServices] = useState(initialServices);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState("");

  const loadBookings = async () => {
    setBookingsLoading(true);
    setBookingsError("");

    const { data, error } = await supabase
      .from("service_requests")
      .select(
        "id, name, phone, email, service_name, people, requested_date, requested_time, notes, status, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase service requests error:", error);
      setBookingsError("تعذر تحميل طلبات الخدمات حاليًا.");
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

  useEffect(() => {
    loadBookings();
  }, []);

  const updateBookingStatus = async (
    id: string,
    status: BookingStatus
  ) => {
    const previous = bookings;

    setBookings((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status } : item
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
      console.error("Supabase status update error:", error);
      setBookings(previous);
      window.alert("تعذر تحديث حالة الطلب. يرجى المحاولة مرة أخرى.");
    }
  };

  const toggleService = (id: number) => {
    setServices((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, active: !item.active }
          : item
      )
    );
  };

  const deleteService = (id: number) => {
    if (window.confirm("هل تريد حذف هذه الخدمة؟")) {
      setServices((items) =>
        items.filter((item) => item.id !== id)
      );
    }
  };

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

  const changePage = (page: string) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="admin-app" dir="rtl">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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
            <strong>مساحة أعمالك</strong>
            <span>لوحة الإدارة</span>
          </div>
        </div>

        <div className="admin-profile">

          <div className="admin-avatar">
            <UserRound size={19} />
          </div>

          <div>
            <strong>مدير الموقع</strong>
            <span>Administrator</span>
          </div>

        </div>

        <nav className="admin-nav">

          <span className="admin-nav-title">
            الإدارة
          </span>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={
                  activePage === item.id
                    ? "admin-nav-item active"
                    : "admin-nav-item"
                }
                onClick={() =>
                  changePage(item.id)
                }
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </button>
            );
          })}

        </nav>

        <div className="admin-sidebar-bottom">

  <button
    className="admin-nav-item"
    onClick={async () => {
      await supabase.auth.signOut();
      window.location.replace("/admin/login");
    }}
  >
    <LogOut size={18} />
    <span>تسجيل الخروج</span>
  </button>

</div>

      </aside>

      {/* Main */}
      <main className="admin-main">

        {/* Header */}
        <header className="admin-header">

          <button
            className="admin-mobile-menu"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Menu size={22} />
          </button>

          <div>
            <h1>
              {
                menuItems.find(
                  (item) =>
                    item.id === activePage
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
            <ChevronLeft size={17} />
          </a>

        </header>

        <div className="admin-content">

          {activePage === "dashboard" && (
            <Dashboard
              bookings={bookings}
              onStatusChange={updateBookingStatus}
              onViewBookings={() => changePage("bookings")}
            />
          )}

          {activePage === "bookings" && (
            <BookingsPage
              bookings={bookings}
              loading={bookingsLoading}
              error={bookingsError}
              onStatusChange={updateBookingStatus}
              onRetry={loadBookings}
            />
          )}

          {activePage === "services" && (
            <ServicesPage
              services={services}
              onToggle={toggleService}
              onDelete={deleteService}
              onAdd={() =>
                setShowServiceModal(true)
              }
            />
          )}

          {activePage === "content" && (
            <ContentManagement />
          )}

          {activePage === "media" && (
            <MediaPage />
          )}

          {activePage === "messages" && (
            <MessagesPage />
          )}

          {activePage === "settings" && (
            <SettingsPage />
          )}

        </div>

      </main>

      {/* Add Service */}
      {showServiceModal && (
        <ServiceModal
          onClose={() =>
            setShowServiceModal(false)
          }
          onSave={(title, description) => {

            const newService: Service = {
              id: Date.now(),
              title,
              description,
              image:
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
              active: true
            };

            setServices((items) => [
              ...items,
              newService
            ]);

            setShowServiceModal(false);
          }}
        />
      )}

    </div>
  );
}

/* Dashboard */

function Dashboard({
  bookings,
  onStatusChange,
  onViewBookings
}: {
  bookings: Booking[];
  onStatusChange: (id: string, status: BookingStatus) => void;
  onViewBookings: () => void;
}) {
  return (
    <div>

      <div className="page-heading">
        <div>
          <h2>نظرة عامة</h2>
          <p>
            ملخص سريع لحالة الموقع والخدمات والطلبات.
          </p>
        </div>
      </div>

      <div className="stats-grid">

        <StatCard
          title="طلبات جديدة"
          value={String(
            bookings.filter((booking) => booking.status === "new").length
          )}
          icon={<CalendarDays />}
          type="green"
        />

        <StatCard
          title="الخدمات"
          value="3"
          icon={<BarChart3 />}
          type="blue"
        />

        <StatCard
          title="رسائل العملاء"
          value="8"
          icon={<Mail />}
          type="gold"
        />

        <StatCard
          title="الصور والفيديو"
          value="16"
          icon={<Image />}
          type="purple"
        />

      </div>

      <div className="dashboard-grid">

        <section className="admin-panel">

          <div className="panel-heading">

            <div>
              <h3>آخر الطلبات</h3>
              <span>آخر طلبات الخدمات</span>
            </div>

            <button onClick={onViewBookings}>
              عرض الكل
              <ChevronLeft size={16} />
            </button>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>العميل</th>
                  <th>الخدمة</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th />
                </tr>
              </thead>

              <tbody>

                {bookings.map((booking) => (
                  <tr key={booking.id}>

                    <td>
                      <div className="customer">
                        <div>
                          <UserRound size={16} />
                        </div>

                        <span>
                          {booking.customer}
                        </span>
                      </div>
                    </td>

                    <td>
                      {booking.service}
                    </td>

                    <td>
                      {booking.date}
                      <small>
                        {booking.time}
                      </small>
                    </td>

                    <td>
                      <StatusBadge
                        status={booking.status}
                      />
                    </td>

                    <td>
                      <select
                        className="status-select"
                        value={booking.status}
                        onChange={(e) =>
                          onStatusChange(
                            booking.id,
                            e.target.value as BookingStatus
                          )
                        }
                        aria-label={`تغيير حالة طلب ${booking.customer}`}
                      >
                        <option value="new">جديد</option>
                        <option value="contacted">تم التواصل</option>
                        <option value="confirmed">مؤكد</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

        <section className="admin-panel quick-panel">

          <div className="panel-heading">
            <div>
              <h3>إجراءات سريعة</h3>
              <span>إدارة المحتوى</span>
            </div>
          </div>

          <QuickAction
            icon={<Plus />}
            title="إضافة خدمة"
            description="أضف خدمة جديدة للموقع"
          />

          <QuickAction
            icon={<Image />}
            title="رفع صورة"
            description="أضف صورة إلى المعرض"
          />

          <QuickAction
            icon={<Video />}
            title="إضافة فيديو"
            description="أضف فيديو تعريفي"
          />

          <QuickAction
            icon={<Settings />}
            title="إعدادات الموقع"
            description="تحديث معلومات التواصل"
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

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>

      <div className="stat-arrow">
        <ChevronLeft size={17} />
      </div>

    </div>
  );
}

function QuickAction({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="quick-action">

      <div className="quick-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <ChevronLeft size={17} />

    </button>
  );
}

/* Bookings */

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
  onStatusChange: (id: string, status: BookingStatus) => void;
  onRetry: () => void;
}) {
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>طلبات الخدمات</h2>
          <p>
            متابعة طلبات وحجوزات العملاء وإدارة حالتها.
          </p>
        </div>

        <div className="heading-filter">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | BookingStatus)
            }
            aria-label="تصفية طلبات الخدمات"
          >
            <option value="all">كل الحالات</option>
            <option value="new">جديد</option>
            <option value="contacted">تم التواصل</option>
            <option value="confirmed">مؤكد</option>
            <option value="completed">مكتمل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      <div className="admin-panel">
        {loading ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <CalendarDays />
            </div>
            <h3>جاري تحميل الطلبات</h3>
            <p>يتم جلب طلبات الخدمات من قاعدة البيانات.</p>
          </div>
        ) : error ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <X />
            </div>
            <h3>{error}</h3>
            <p>تحقق من اتصال Supabase ثم حاول مرة أخرى.</p>
            <button
              className="admin-primary-button"
              onClick={onRetry}
            >
              إعادة المحاولة
            </button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="empty-admin">
            <div className="empty-icon">
              <CalendarDays />
            </div>
            <h3>لا توجد طلبات</h3>
            <p>
              لا توجد طلبات خدمات ضمن الحالة المحددة حاليًا.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>العميل</th>
                  <th>الجوال</th>
                  <th>الخدمة</th>
                  <th>التاريخ</th>
                  <th>الوقت</th>
                  <th>الحالة</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.customer}</strong>
                    </td>

                    <td dir="ltr">{booking.phone}</td>

                    <td>{booking.service}</td>

                    <td>{booking.date || "—"}</td>

                    <td>{booking.time || "—"}</td>

                    <td>
                      <select
                        className="status-select"
                        value={booking.status}
                        onChange={(e) =>
                          onStatusChange(
                            booking.id,
                            e.target.value as BookingStatus
                          )
                        }
                        aria-label={`حالة طلب ${booking.customer}`}
                      >
                        <option value="new">جديد</option>
                        <option value="contacted">تم التواصل</option>
                        <option value="confirmed">مؤكد</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="icon-button"
                        onClick={() =>
                          setSelectedBooking(booking)
                        }
                        aria-label="عرض تفاصيل الطلب"
                      >
                        <MoreVertical size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={onStatusChange}
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
  onStatusChange: (id: string, status: BookingStatus) => void;
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
          <X size={19} />
        </button>

        <div className="admin-modal-heading">
          <span>تفاصيل الطلب</span>
          <h2>{booking.service}</h2>
          <p>
            تم استلام الطلب في{" "}
            {new Date(booking.createdAt).toLocaleString("ar-SA")}
          </p>
        </div>

        <div className="settings-form">
          <label>
            اسم العميل
            <input value={booking.customer} readOnly />
          </label>

          <label>
            رقم الجوال
            <input value={booking.phone} readOnly dir="ltr" />
          </label>

          <label>
            البريد الإلكتروني
            <input
              value={booking.email || "غير مضاف"}
              readOnly
              dir="ltr"
            />
          </label>

          <label>
            عدد الأشخاص
            <input
              value={
                booking.people !== null
                  ? String(booking.people)
                  : "غير محدد"
              }
              readOnly
            />
          </label>

          <label>
            الموعد
            <input
              value={`${booking.date || "غير محدد"} — ${
                booking.time || "غير محدد"
              }`}
              readOnly
              dir="ltr"
            />
          </label>

          <label>
            الحالة
            <select
              value={booking.status}
              onChange={(e) =>
                onStatusChange(
                  booking.id,
                  e.target.value as BookingStatus
                )
              }
            >
              <option value="new">جديد</option>
              <option value="contacted">تم التواصل</option>
              <option value="confirmed">مؤكد</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </label>

          <label>
            الملاحظات
            <textarea
              rows={4}
              value={booking.notes || "لا توجد ملاحظات"}
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

/* Services */

function ServicesPage({
  services,
  onToggle,
  onDelete,
  onAdd
}: {
  services: Service[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}) {
  return (
    <div>

      <div className="page-heading">

        <div>
          <h2>الخدمات</h2>
          <p>
            إدارة الخدمات التي تظهر للعملاء في الموقع.
          </p>
        </div>

        <button
          className="admin-primary-button"
          onClick={onAdd}
        >
          <Plus size={18} />
          إضافة خدمة
        </button>

      </div>

      <div className="admin-services-grid">

        {services.map((service) => (
          <div
            className="admin-service-card"
            key={service.id}
          >

            <div className="admin-service-image">

              <img
                src={service.image}
                alt={service.title}
              />

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

              <h3>{service.title}</h3>

              <p>
                {service.description}
              </p>

              <div className="service-actions">

                <button className="edit-button">
                  <Pencil size={15} />
                  تعديل
                </button>

                <button
                  className={
                    service.active
                      ? "hide-button"
                      : "show-button"
                  }
                  onClick={() =>
                    onToggle(service.id)
                  }
                >
                  {service.active
                    ? "إخفاء"
                    : "إظهار"}
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    onDelete(service.id)
                  }
                >
                  <Trash2 size={15} />
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

/* Media */

function MediaPage() {
  const media = [
    {
      type: "image",
      title: "مساحة العمل",
      url:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    },
    {
      type: "image",
      title: "قاعة الاجتماعات",
      url:
        "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80"
    },
    {
      type: "image",
      title: "المكاتب الخاصة",
      url:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div>

      <div className="page-heading">

        <div>
          <h2>الصور والفيديو</h2>
          <p>
            إدارة الصور والفيديوهات المستخدمة في الموقع.
          </p>
        </div>

        <button className="admin-primary-button">
          <Plus size={18} />
          إضافة وسائط
        </button>

      </div>

      <div className="media-tabs">
        <button className="active">
          <Image size={16} />
          الصور
        </button>

        <button>
          <Film size={16} />
          الفيديو
        </button>
      </div>

      <div className="media-grid">

        {media.map((item) => (
          <div
            className="media-card"
            key={item.title}
          >

            <div className="media-image">

              <img
                src={item.url}
                alt={item.title}
              />

              <div className="media-actions">

                <button>
                  <Pencil size={15} />
                </button>

                <button>
                  <Trash2 size={15} />
                </button>

              </div>

            </div>

            <div className="media-info">
              <strong>{item.title}</strong>
              <span>صورة</span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

/* Messages */

function MessagesPage() {
  return (
    <div>

      <div className="page-heading">

        <div>
          <h2>رسائل العملاء</h2>
          <p>
            الرسائل والاستفسارات الواردة من الموقع.
          </p>
        </div>

      </div>

      <div className="empty-admin">

        <div className="empty-icon">
          <Mail />
        </div>

        <h3>
          لا توجد رسائل جديدة
        </h3>

        <p>
          ستظهر رسائل العملاء هنا عند إرسالها.
        </p>

      </div>

    </div>
  );
}

/* Settings */

function SettingsPage() {
  return (
    <div>

      <div className="page-heading">

        <div>
          <h2>إعدادات الموقع</h2>
          <p>
            معلومات الاتصال والبيانات الأساسية للموقع.
          </p>
        </div>

      </div>

      <div className="settings-grid">

        <section className="admin-panel">

          <div className="panel-heading">

            <div>
              <h3>معلومات التواصل</h3>
              <span>
                ستظهر هذه البيانات في الموقع
              </span>
            </div>

          </div>

          <div className="settings-form">

            <label>
              اسم الموقع
              <input
                defaultValue="مساحة أعمالك"
              />
            </label>

            <label>
              رقم الجوال
              <input
                defaultValue="+966 50 000 0000"
              />
            </label>

            <label>
              رقم واتساب
              <input
                defaultValue="966500000000"
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
                defaultValue="المملكة العربية السعودية"
              />
            </label>

          </div>

          <button
            className="admin-primary-button save-settings"
          >
            حفظ التغييرات
          </button>

        </section>

        <section className="admin-panel">

          <div className="panel-heading">

            <div>
              <h3>روابط التواصل</h3>
              <span>
                حسابات التواصل الاجتماعي
              </span>
            </div>

          </div>

          <div className="settings-form">

            <label>
              Instagram
              <input
                placeholder="رابط الحساب"
              />
            </label>

            <label>
              X
              <input
                placeholder="رابط الحساب"
              />
            </label>

            <label>
              LinkedIn
              <input
                placeholder="رابط الحساب"
              />
            </label>

            <label>
              Google Maps
              <input
                placeholder="رابط الموقع"
              />
            </label>

          </div>

        </section>

      </div>

    </div>
  );
}

/* Status */

function getStatusLabel(status: BookingStatus) {
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

/* Modal */

function ServiceModal({
  onClose,
  onSave
}: {
  onClose: () => void;
  onSave: (
    title: string,
    description: string
  ) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSave(title, description);
  };

  return (
    <div className="admin-modal-backdrop">

      <div className="admin-modal">

        <button
          className="admin-modal-close"
          onClick={onClose}
        >
          <X size={19} />
        </button>

        <div className="admin-modal-heading">

          <span>خدمة جديدة</span>

          <h2>إضافة خدمة</h2>

          <p>
            أضف خدمة جديدة ليتم عرضها في الموقع.
          </p>

        </div>

        <form onSubmit={submit}>

          <label>
            اسم الخدمة

            <input
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="مثال: قاعة تدريب"
            />
          </label>

          <label>
            وصف الخدمة

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="اكتب وصفًا مختصرًا للخدمة..."
            />
          </label>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="admin-primary-button"
            >
              حفظ الخدمة
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AdminApp;