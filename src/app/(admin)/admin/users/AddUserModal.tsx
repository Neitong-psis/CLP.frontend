'use client';

import { useState } from 'react';
import { CalendarIcon, Upload, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/TextArea';
import { Field, FieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import Avatar from '@/components/ui/avatar';
import { ComboField } from '@/components/ui/ComboField';

const LABEL_CLS =
  'text-xs font-semibold tracking-wide text-slate-500 uppercase';

export default function AddUserModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Learner');
  const [dob, setDob] = useState<Date | undefined>();
  const [dobOpen, setDobOpen] = useState(false);
  const [joinDate, setJoinDate] = useState<Date | undefined>();
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Profile header card */}
            <div className="mb-7 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <div className="flex items-center gap-4">
                <Avatar name={name} />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {name || 'New user profile'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {email || 'Add email address'}
                  </p>
                  <span className="mt-1 inline-block rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500">
                    {role}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                  <Upload className="h-3.5 w-3.5" />
                  Upload picture
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                  <Camera className="h-3.5 w-3.5" />
                  Use camera
                </button>
              </div>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Full Name</Label>
                </FieldLabel>
                <Input
                  type="text"
                  placeholder="Sarah Wilson"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  className="h-9"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Username</Label>
                </FieldLabel>
                <Input type="text" placeholder="sarah.wilson" className="h-9" />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Email</Label>
                </FieldLabel>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="h-9"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Phone Number</Label>
                </FieldLabel>
                <Input
                  type="tel"
                  placeholder="+855 12 345 678"
                  className="h-9"
                />
              </Field>

              <ComboField
                label="Role"
                items={['Learner', 'Educator', 'Admin']}
                onValueChange={(v) => setRole(v ?? 'Learner')}
              />

              <ComboField
                label="Status"
                items={['Active', 'Inactive', 'Suspended', 'Achieved']}
              />

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Courses</Label>
                </FieldLabel>
                <Input type="number" placeholder="0" min={0} className="h-9" />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Join Date</Label>
                </FieldLabel>
                <Popover open={joinOpen} onOpenChange={setJoinOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        className="h-9 w-full justify-start font-normal"
                      >
                        <CalendarIcon className="h-4 w-4 text-slate-400" />
                        <span
                          className={
                            joinDate ? 'text-slate-800' : 'text-slate-400'
                          }
                        >
                          {joinDate ? format(joinDate, 'PPP') : 'Pick a date'}
                        </span>
                      </Button>
                    }
                  />
                  <PopoverContent
                    className="w-auto overflow-hidden bg-white p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={joinDate}
                      defaultMonth={joinDate}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setJoinDate(date);
                        setJoinOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Student / Staff ID</Label>
                </FieldLabel>
                <Input type="text" placeholder="CLP-20262005" className="h-9" />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Organization</Label>
                </FieldLabel>
                <Input type="text" placeholder="CLP Academy" className="h-9" />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Program</Label>
                </FieldLabel>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <ComboField
                      label="Program"
                      items={[
                        'Web Development',
                        'Data Science',
                        'Cloud Computing',
                        'DevOps',
                      ]}
                      hideLabel
                    />
                  </div>
                  <button className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50">
                    + Add
                  </button>
                </div>
              </Field>

              <ComboField label="Gender" items={['Male', 'Female', 'Other']} />

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Date of Birth</Label>
                </FieldLabel>
                <Popover open={dobOpen} onOpenChange={setDobOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        className="h-9 w-full justify-start font-normal"
                      >
                        <CalendarIcon className="h-4 w-4 text-slate-400" />
                        <span
                          className={dob ? 'text-slate-800' : 'text-slate-400'}
                        >
                          {dob ? format(dob, 'PPP') : 'Pick a date'}
                        </span>
                      </Button>
                    }
                  />
                  <PopoverContent
                    className="w-auto overflow-hidden bg-white p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={dob}
                      defaultMonth={dob}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDob(date);
                        setDobOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Nationality</Label>
                </FieldLabel>
                <Input type="text" placeholder="Cambodian" className="h-9" />
              </Field>

              <Field className="col-span-2">
                <FieldLabel>
                  <Label className={LABEL_CLS}>Address</Label>
                </FieldLabel>
                <Input
                  type="text"
                  placeholder="Phnom Penh, Cambodia"
                  className="h-9"
                />
              </Field>

              <Field className="col-span-2">
                <FieldLabel>
                  <Label className={LABEL_CLS}>Bio / About Me</Label>
                </FieldLabel>
                <Textarea
                  placeholder="Add a short profile note..."
                  className="min-h-20 resize-none"
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-8 py-4">
          <Button
            onClick={onClose}
            variant="ghost"
            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="rounded-lg px-5 py-2.5 text-sm font-bold text-white"
          >
            Create User
          </Button>
        </div>
      </div>
    </div>
  );
}
