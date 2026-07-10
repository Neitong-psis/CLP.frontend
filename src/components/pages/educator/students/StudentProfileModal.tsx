import React from 'react';
import { StudentRow } from '@/constants/educator';
import { UserProfileModal } from '@/components/shared/UserProfileModal';
import { UserProfileData } from '@/types/profile';

interface StudentProfileModalProps {
  student: StudentRow | null;
  onClose: () => void;
}

export function StudentProfileModal({
  student,
  onClose,
}: StudentProfileModalProps) {
  if (!student) return null;

  const idNum = parseInt(student.id.replace(/\D/g, ''), 10) || 1;
  const profileData: UserProfileData = {
    id: student.id,
    name: student.name,
    email: student.email,
    username: student.name.toLowerCase().replace(/\s+/g, '_'),
    phone: 'Not provided',
    role: 'Learner',
    status: student.status,
    coursesCount:
      student.status === 'Active' ? 1 : student.status === 'Completed' ? 1 : 0,
    joined: student.enrolled,
    studentId: `ADM-${3000 + idNum}`,
    program: student.course,
    organization: 'CLP Academy',
    gender: 'Not provided',
    dob: 'Not provided',
    nationality: 'Not provided',
    address: 'Not provided',
    bio: 'No bio has been added yet.',
  };
  return <UserProfileModal user={profileData} onClose={onClose} />;
}
