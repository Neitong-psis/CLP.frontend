import React from 'react';
import {
  User,
  Hash,
  Mail,
  Phone,
  Tag,
  Users,
  ShieldCheck,
  BookOpen,
  Compass,
  Building,
  Calendar,
  Globe,
  MapPin,
  FileText,
  SquarePen,
} from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { Modal } from '@/components/modals/Modal';
import { UserProfileData } from '@/types/profile';
import { cn } from '@/lib/utils/cn';

interface UserProfileModalProps {
  user: UserProfileData | null;
  onClose: () => void;
  onEdit?: () => void;
}

export function UserProfileModal({
  user,
  onClose,
  onEdit,
}: UserProfileModalProps) {
  if (!user) return null;

  return (
    <Modal
      title={
        <span className="flex items-center gap-2">
          <User className="text-brand-gold h-5 w-5" />
          Education Profile
        </span>
      }
      onClose={onClose}
      maxWidth="max-w-4xl"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 cursor-pointer rounded-lg border-slate-200 px-6 font-bold text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </Button>
          {onEdit && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-6 font-bold"
              onClick={onEdit}
            >
              <SquarePen className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      }
    >
      <div className="flex max-h-[60vh] flex-col items-start gap-6 overflow-y-auto pr-1 md:flex-row">
        {/* Sidebar avatar card */}
        <div className="flex w-full shrink-0 flex-col items-center rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center md:w-1/4">
          <div className="mb-4 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold tracking-wider text-white shadow-md">
            {user.name
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((n) => n[0].toUpperCase())
              .join('')}
          </div>
          <h3 className="text-sm font-bold text-slate-800">{user.name}</h3>
          <p className="mt-1 text-xs text-slate-400">{user.email}</p>

          <div className="mt-4 flex gap-1.5">
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
              {user.role}
            </span>
            <span
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-[10px] font-bold',
                user.status === 'Completed' ||
                  user.status === 'Achieved' ||
                  user.status === 'Active'
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : user.status === 'Inactive'
                    ? 'border-slate-200 bg-slate-50 text-slate-500'
                    : 'border-blue-100 bg-blue-50 text-blue-700',
              )}
            >
              {user.status === 'Completed' ? 'Achieved' : user.status}
            </span>
          </div>
        </div>

        {/* Detailed fields grid */}
        <div className="w-full flex-1 space-y-4">
          <div className="grid grid-cols-1 gap-3 text-slate-700 sm:grid-cols-2">
            {[
              { label: 'Full Name', val: user.name, icon: <User /> },
              {
                label: 'Username',
                val:
                  user.username || user.name.toLowerCase().replace(/\s+/g, ''),
                icon: <Hash />,
              },
              { label: 'Email', val: user.email, icon: <Mail /> },
              {
                label: 'Phone',
                val: user.phone || 'Not provided',
                icon: <Phone />,
              },
              {
                label: 'Staff ID',
                val: user.studentId || 'Not provided',
                icon: <Tag />,
              },
              { label: 'User Role', val: user.role, icon: <Users /> },
              {
                label: 'Status',
                val: user.status === 'Completed' ? 'Achieved' : user.status,
                icon: <ShieldCheck />,
              },
              {
                label: 'Courses',
                val: user.coursesCount ?? '0',
                icon: <BookOpen />,
              },
              {
                label: 'Program',
                val: user.program || 'Not provided',
                icon: <Compass />,
              },
              {
                label: 'Organization',
                val: user.organization || 'Not provided',
                icon: <Building />,
              },
              { label: 'Joined', val: user.joined, icon: <Calendar /> },
              {
                label: 'Gender',
                val: user.gender || 'Not provided',
                icon: <User />,
              },
              {
                label: 'Date of Birth',
                val: user.dob || 'Not provided',
                icon: <Calendar />,
              },
              {
                label: 'Nationality',
                val: user.nationality || 'Not provided',
                icon: <Globe />,
              },
              {
                label: 'Address',
                val: user.address || 'Not provided',
                icon: <MapPin />,
              },
            ].map((field, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white p-4 text-left"
              >
                <span className="flex items-center gap-2 text-xs font-normal text-slate-500">
                  {React.cloneElement(field.icon, {
                    className: 'w-4 h-4 text-brand-gold shrink-0',
                  })}
                  {field.label}
                </span>
                <span className="text-brand-navy text-sm font-bold">
                  {field.val}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 rounded-xl border border-slate-100 bg-white p-4 text-left">
            <span className="flex items-center gap-2 text-xs font-normal text-slate-500">
              <FileText className="text-brand-gold h-4 w-4 shrink-0" />
              Bio / About Me
            </span>
            <p className="text-brand-navy text-sm font-bold">
              {user.bio || 'No bio has been added yet.'}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
