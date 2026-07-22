import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FiUsers,
  FiCalendar,
  FiBriefcase,
  FiShield,
  FiClock,
  FiBarChart,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiTarget,
  FiHeart,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function Landing() {
  const navigate = useNavigate();

  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactForm) => {
    // TODO: wire this up to your contact/support endpoint
    console.log(data);
    setSent(true);
    reset();
  };

  const features = [
    {
      icon: <FiUsers />,
      title: "Employee Management",
      desc: "Manage employee records, roles, departments and personal information.",
    },
    {
      icon: <FiClock />,
      title: "Attendance Tracking",
      desc: "Track employee check-in, check-out and working hours.",
    },
    {
      icon: <FiCalendar />,
      title: "Leave Management",
      desc: "Apply, approve and monitor employee leaves easily.",
    },
    {
      icon: <FiBriefcase />,
      title: "Department Management",
      desc: "Organize employees into departments with managers.",
    },
    {
      icon: <FiShield />,
      title: "Role Based Access",
      desc: "Secure access using admin, manager and employee roles.",
    },
    {
      icon: <FiBarChart />,
      title: "Reports & Analytics",
      desc: "Get insights about workforce performance.",
    },
  ];

  const stats = [
    { value: "10k+", label: "Employees managed" },
    { value: "500+", label: "Companies" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur md:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-purple-600 text-sm font-bold text-white">
            E
          </div>
          <span className="text-lg font-bold">EMS</span>
        </div>

        <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="transition hover:text-slate-900">
            Features
          </a>
          <a href="#about" className="transition hover:text-slate-900">
            About
          </a>
          <a href="#contact" className="transition hover:text-slate-900">
            Contact
          </a>
        </nav>

        <button
          onClick={() => navigate("/login")}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:shadow-md hover:shadow-blue-200"
        >
          Login
        </button>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-20">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 top-40 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Built for modern HR teams
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Smart Employee{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Management System
              </span>
            </h1>

            <p className="mt-4 max-w-md text-base text-slate-600">
              Manage employees, attendance, leaves and departments from one
              powerful platform.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/login")}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-200 transition hover:shadow-lg"
              >
                Get Started
                <FiArrowRight className="transition group-hover:translate-x-0.5" />
              </button>

              <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                Learn More
              </button>
            </div>

            <div className="mt-10 flex gap-8 border-t border-slate-200 pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl border border-slate-100 bg-white p-4 shadow-xl">
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 blur-xl" />

            {/* DASHBOARD PREVIEW MOCKUP */}
            <div className="overflow-hidden rounded-2xl border border-slate-100">
              {/* window chrome */}
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
              </div>

              <div className="grid grid-cols-[auto_1fr] bg-white">
                {/* sidebar */}
                <div className="hidden w-32 flex-col gap-1 border-r border-slate-100 bg-slate-50/60 p-3 sm:flex">
                  {[
                    { label: "Overview", active: true },
                    { label: "Employees" },
                    { label: "Attendance" },
                    { label: "Leaves" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-lg px-3 py-2 text-xs font-medium ${
                        item.active
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "text-slate-500"
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* main panel */}
                <div className="space-y-4 p-4">
                  {/* stat cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Employees", value: "128" },
                      { label: "On Leave", value: "6" },
                      { label: "Departments", value: "9" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"
                      >
                        <p className="text-lg font-bold text-slate-900">
                          {s.value}
                        </p>
                        <p className="text-[11px] text-slate-500">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* bar chart */}
                  <div className="rounded-xl border border-slate-100 p-3">
                    <p className="text-xs font-semibold text-slate-600">
                      Weekly attendance
                    </p>
                    <div className="mt-3 flex h-20 items-end gap-2">
                      {[45, 70, 55, 90, 65, 40, 80].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-purple-500 opacity-80"
                        />
                      ))}
                    </div>
                  </div>

                  {/* employee rows */}
                  <div className="space-y-2 rounded-xl border border-slate-100 p-3">
                    {[
                      { name: "Amara Diallo", role: "Product Designer" },
                      { name: "Yusuf Khan", role: "Backend Engineer" },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-[10px] font-semibold text-blue-700">
                          {p.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-slate-500">{p.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Everything you need to manage employees
          </h2>
          <p className="mt-3 text-slate-600">
            One platform covering people, time and access — so nothing falls
            through the cracks.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 text-xl text-blue-600 transition group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
              About EMS
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Workforce management, without the busywork
            </h2>

            <p className="mt-4 text-slate-600">
              EMS started as an internal tool for a 40-person team drowning in
              spreadsheets. Today it helps HR teams of every size keep employee
              records, attendance and leave in one place — so people spend less
              time on admin and more time on people.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Set up a department in minutes, not days",
                "One source of truth for every employee record",
                "Built with role-based access from day one",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-blue-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <FiTarget className="text-2xl text-blue-600" />
              <h3 className="mt-3 font-bold">Our mission</h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Make HR operations simple enough that any team can run them.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <FiHeart className="text-2xl text-purple-600" />
              <h3 className="mt-3 font-bold">Our values</h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Clarity, reliability and respect for people's time.
              </p>
            </div>

            <div className="col-span-2 rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 p-6 text-white shadow-sm">
              <p className="text-2xl font-bold">2026</p>
              <p className="mt-1 text-sm text-blue-100">
                Founded, and still built by a small team that uses EMS every
                single day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Get in touch</h2>
            <p className="mt-3 text-slate-600">
              Questions about EMS? Send us a message and we'll get back to you.
            </p>
          </div>

          <div className="mt-10 grid gap-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-5 md:p-8">
            {/* contact info */}
            <div className="space-y-5 md:col-span-2">
              {[
                { icon: <FiMail />, label: "Email", value: "ems@work.com" },
                { icon: <FiPhone />, label: "Phone", value: "+971 543650680" },
                { icon: <FiMapPin />, label: "Office", value: "Dubai" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:col-span-3"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-blue-100"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    placeholder="Your email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-blue-100"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <textarea
                  {...register("message", {
                    required: "Tell us how we can help",
                  })}
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-blue-100"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:shadow-md disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>

              {sent && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                  <FiCheckCircle /> Thanks — we'll be in touch soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-6 mb-16 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-center text-white md:mx-10">
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to manage your workforce?
        </h2>
        <p className="mt-3 text-blue-100">Start using EMS today.</p>

        <button
          onClick={() => navigate("/login")}
          className="mt-7 rounded-xl bg-white px-8 py-3 font-semibold text-blue-600 shadow-md transition hover:bg-blue-50"
        >
          Login Now
        </button>
      </section>

      <footer className="border-t border-slate-800 bg-slate-900 py-6 text-center text-sm text-slate-400">
        © 2026 EMS. All rights reserved.
      </footer>
    </div>
  );
}
