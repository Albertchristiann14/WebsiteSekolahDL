"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, TenantCode } from "@/lib/adminData";
import {
  Calendar,
  PlusCircle,
  Search,
  Clock,
  MapPin,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
} from "lucide-react";

interface AcademicEvent {
  id: string;
  tenantId: TenantCode;
  title: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  category: "Akademik" | "Ujian" | "Libur" | "Kegiatan Siswa" | "SPMB";
  description: string;
}

const INITIAL_EVENTS: AcademicEvent[] = [
  {
    id: "evt-1",
    tenantId: "portal",
    title: "Masa Pendaftaran SPMB Gelombang 1 Dibuka",
    startDate: "2026-11-01",
    endDate: "2026-12-31",
    time: "08:00 - 16:00 WIB",
    location: "Kampus Terpadu Dharma Loka & Online",
    category: "SPMB",
    description: "Penerimaan peserta didik baru tahun ajaran 2026/2027 jalur Early Bird dan Prestasi.",
  },
  {
    id: "evt-2",
    tenantId: "sma",
    title: "Workshop Robotika & Sains STEAM SMA",
    startDate: "2026-11-14",
    endDate: "2026-11-14",
    time: "09:00 - 13:00 WIB",
    location: "Laboratorium Robotika & IoT",
    category: "Kegiatan Siswa",
    description: "Pelatihan pemrograman mikrokontroler dan perakitan robot mini untuk kompetisi nasional.",
  },
  {
    id: "evt-3",
    tenantId: "smp",
    title: "Penilaian Akhir Semester (PAS) Ganjil",
    startDate: "2026-12-01",
    endDate: "2026-12-08",
    time: "07:30 - 12:00 WIB",
    location: "Ruang Kelas SMP Dharma Loka",
    category: "Ujian",
    description: "Ujian berbasis komputer (CBT) evaluasi pembelajaran semester ganjil.",
  },
  {
    id: "evt-4",
    tenantId: "tk",
    title: "Pentas Budaya & Hari Anak Bahagia PAUD",
    startDate: "2026-11-20",
    endDate: "2026-11-20",
    time: "08:30 - 11:30 WIB",
    location: "Aula Serbaguna Dharma Loka",
    category: "Kegiatan Siswa",
    description: "Pentas tari tradisional, paduan suara anak, dan pameran karya seni jari.",
  },
];

export default function AdminEventsPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [events, setEvents] = useState<AcademicEvent[]>(INITIAL_EVENTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newTime, setNewTime] = useState("08:00 - 12:00 WIB");
  const [newLocation, setNewLocation] = useState("Kampus Dharma Loka");
  const [newCategory, setNewCategory] = useState<AcademicEvent["category"]>("Akademik");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setActiveTenant(AdminStore.getActiveTenantFilter());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredEvents = events.filter((evt) => {
    const matchTenant = activeTenant === "portal" || evt.tenantId === activeTenant || evt.tenantId === "portal";
    const matchSearch =
      evt.title.toLowerCase().includes(search.toLowerCase()) ||
      evt.location.toLowerCase().includes(search.toLowerCase());
    return matchTenant && matchSearch;
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newStartDate) return;

    const newEvt: AcademicEvent = {
      id: `evt-${Date.now()}`,
      tenantId: activeTenant,
      title: newTitle,
      startDate: newStartDate,
      endDate: newStartDate,
      time: newTime,
      location: newLocation,
      category: newCategory,
      description: "Agenda resmi kalender akademik Sekolah Dharma Loka Pekanbaru.",
    };

    setEvents([newEvt, ...events]);
    setIsModalOpen(false);
    setNewTitle("");
    showToast("Agenda kegiatan akademik berhasil ditambahkan.");
  };

  const handleDeleteEvent = (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus agenda kegiatan ini?")) return;
    setEvents(events.filter((e) => e.id !== id));
    showToast("Agenda kegiatan berhasil dihapus.");
  };

  return (
    <AdminLayout
      title="Agenda & Kalender Akademik"
      subtitle="Publikasikan jadwal kegiatan sekolah, ujian semester, batas gelombang SPMB, dan agenda penting institusi"
      breadcrumbs={[{ label: "CMS" }, { label: "Agenda & Kalender" }]}
      actions={
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-royal text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-royal-dark transition cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Agenda Baru</span>
        </button>
      }
    >
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Search */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul kegiatan atau lokasi..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredEvents.length} Agenda Ditemukan
          </span>
        </div>

        {/* Event List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-royal/40 transition"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-royal border border-blue-200">
                    {evt.category}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {evt.tenantId.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-royal" />
                    <span>{evt.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.time}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteEvent(evt.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition self-end sm:self-auto cursor-pointer"
                  title="Hapus Agenda"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Tambah Agenda */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">
                Tambah Agenda Akademik Baru
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nama Kegiatan / Agenda:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Try Out Ujian Nasional 1"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-royal/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Tanggal Pelaksanaan:
                  </label>
                  <input
                    type="date"
                    required
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Waktu / Jam:
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="08:00 - 12:00 WIB"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Lokasi / Ruangan:
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Aula Utama / Lab CBT"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Kategori Agenda:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Ujian">Ujian</option>
                  <option value="Kegiatan Siswa">Kegiatan Siswa</option>
                  <option value="SPMB">SPMB</option>
                  <option value="Libur">Libur Sekolah</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-royal text-white font-bold hover:bg-royal-dark shadow-xs"
                >
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

