"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  GraduationCap,
  Award,
  Mail,
  BookOpen,
  UserCheck,
  Briefcase,
  Quote,
} from "lucide-react";
import { teachersData, TeacherStaffProfile } from "@/data/teachers";
import { Badge, Card, Modal } from "@/components/ui/DesignSystem";

export function TeachersClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "pimpinan" | "guru" | "staf"
  >("all");
  const [levelFilter, setLevelFilter] = useState<
    "all" | "tk" | "sd" | "smp" | "sma"
  >("all");
  const [selectedTeacher, setSelectedTeacher] =
    useState<TeacherStaffProfile | null>(null);

  const filteredTeachers = useMemo(() => {
    return teachersData.filter((item) => {
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesLevel =
        levelFilter === "all" ||
        item.level === "semua" ||
        item.level === levelFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.education.toLowerCase().includes(q);
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [searchQuery, categoryFilter, levelFilter]);

  return (
    <div className="space-y-10">
      {/* Filter & Search Bar */}
      <Card className="p-6 space-y-5 bg-blue-50/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama guru, mata pelajaran, atau pendidikan..."
              aria-label="Cari guru atau staf"
              className="w-full min-h-[46px] pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-blue-200 text-sm text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal"
            />
          </div>

          {/* Filter Kategori */}
          <div className="lg:col-span-4 flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "Semua GTK" },
              { id: "pimpinan", label: "Pimpinan" },
              { id: "guru", label: "Guru Mapel/Kelas" },
              { id: "staf", label: "Staf & Konselor" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id as any)}
                className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  categoryFilter === cat.id
                    ? "bg-royal text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-blue-50 border border-blue-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filter Jenjang */}
          <div className="lg:col-span-3 flex flex-wrap gap-1.5 lg:justify-end">
            {[
              { id: "all", label: "Semua Unit" },
              { id: "tk", label: "TK" },
              { id: "sd", label: "SD" },
              { id: "smp", label: "SMP" },
              { id: "sma", label: "SMA" },
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setLevelFilter(lvl.id as any)}
                className={`px-3 py-2 min-h-[40px] rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  levelFilter === lvl.id
                    ? "bg-primary-950 text-white"
                    : "bg-white text-slate-600 hover:bg-blue-50 border border-blue-100"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Grid Kartu Direktori GTK */}
      {filteredTeachers.length === 0 ? (
        <Card className="p-14 text-center space-y-3">
          <p className="text-lg font-extrabold text-primary-950">
            Data Pendidik Tidak Ditemukan
          </p>
          <p className="text-sm text-slate-500">
            Coba gunakan kata kunci pencarian atau filter kategori lainnya.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
              setLevelFilter("all");
            }}
            className="px-4 py-2 rounded-xl bg-royal text-white text-xs font-bold cursor-pointer"
          >
            Reset Pencarian
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="overflow-hidden flex flex-col justify-between group hover:border-royal/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[4/4] bg-blue-50 overflow-hidden">
                  <Image
                    src={teacher.photo}
                    alt={teacher.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-white/95 text-royal text-[11px] font-extrabold uppercase shadow-xs">
                      {teacher.level === "semua"
                        ? "Lintas Jenjang"
                        : `Unit ${teacher.level.toUpperCase()}`}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-royal block">
                    {teacher.role}
                  </span>
                  <h3 className="text-lg font-extrabold text-primary-950 leading-snug">
                    {teacher.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 flex items-start gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-royal shrink-0 mt-0.5" />
                    <span>{teacher.subject}</span>
                  </p>
                  <p className="text-xs text-slate-500 flex items-start gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      {teacher.education} — {teacher.university}
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(teacher)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-royal text-royal hover:text-white text-xs font-extrabold transition cursor-pointer"
                >
                  Lihat Detail Profil & Sertifikasi
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Detail Profil Pendidik */}
      <Modal
        isOpen={!!selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
        title={selectedTeacher?.name || "Profil Pendidik"}
      >
        {selectedTeacher && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-blue-100">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-blue-100 shrink-0 border-2 border-blue-200">
                <Image
                  src={selectedTeacher.photo}
                  alt={selectedTeacher.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="blue">
                    {selectedTeacher.level === "semua"
                      ? "Unit Terpadu"
                      : `Unit ${selectedTeacher.level.toUpperCase()}`}
                  </Badge>
                  <Badge variant="emerald">
                    {selectedTeacher.experienceYears} Tahun Pengalaman
                  </Badge>
                </div>
                <h4 className="text-xl font-extrabold text-primary-950">
                  {selectedTeacher.name}
                </h4>
                <p className="text-sm font-bold text-royal">
                  {selectedTeacher.role}
                </p>
                <p className="text-xs text-slate-500">
                  Bidang Ampuan: {selectedTeacher.subject}
                </p>
              </div>
            </div>

            <blockquote className="p-4 rounded-2xl bg-blue-50/60 border-l-4 border-royal text-sm italic text-primary-950 flex items-start gap-2.5">
              <Quote className="w-5 h-5 text-royal shrink-0" />
              <span>“{selectedTeacher.quote}”</span>
            </blockquote>

            <div className="space-y-2">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Profil Singkat
              </h5>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedTeacher.bio}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-bold uppercase text-slate-400">
                  Pendidikan Terakhir
                </span>
                <p className="text-sm font-extrabold text-primary-950">
                  {selectedTeacher.education}
                </p>
                <p className="text-xs text-slate-600">
                  {selectedTeacher.university}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-bold uppercase text-slate-400">
                  Kontak Akademik
                </span>
                <p className="text-sm font-bold text-royal flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {selectedTeacher.email}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Sertifikasi & Lisensi Profesional
              </h5>
              <ul className="space-y-1.5">
                {selectedTeacher.certifications.map((cert) => (
                  <li
                    key={cert}
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary-950"
                  >
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

