import { useState } from 'react';
import styles from './CardSection.module.css';
import { CardUser } from '../CardUser';
import { Button } from '@/shared/ui/Button';
import { SkillDomain } from '@/shared/types';
import { getSkillsFromDomains, getCategoriesFromDomains } from '@/shared/lib/helpers';
import { getAge, getSkillName, getCategoryNames } from '@/shared/lib/helpers';

export type User = {
  id: string;
  avatarUrl: string | null;
  fullName: string;
  location: string;
  birthday: string;
  idSkill: number;
  favoriteCategories: string[];
  bio?: string;
};

type CardSectionProps = {
  title: string;
  users: User[];
  domains: SkillDomain[];
  likedUserIds?: string[];
  sentOfferUserIds?: string[];
  onLikeClick?: (userId: string) => void;
  onDetailsClick?: (userId: string) => void;
};

export const CardSection = ({
  title,
  users,
  domains,
  likedUserIds = [],
  sentOfferUserIds = [],
  onLikeClick,
  onDetailsClick,
}: CardSectionProps) => {
  const skills = getSkillsFromDomains(domains);
  const categories = getCategoriesFromDomains(domains);

  const [isExpanded, setIsExpanded] = useState(false);

  const visibleUsers = isExpanded ? users : users.slice(0, 3);
  const hasMore = users.length > 3;

  const handleToggle = () => setIsExpanded((prev: boolean) => !prev);

  return (
    <section>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {hasMore && (
          <Button variant="tertiary" onClick={handleToggle}>
            {isExpanded ? 'Свернуть' : 'Посмотреть все'}
          </Button>
        )}
      </div>

      <div className={styles.cards}>
        {visibleUsers.map((user) => (
          <CardUser
            key={user.id}
            avatarUrl={user.avatarUrl}
            name={user.fullName}
            location={user.location}
            age={getAge(user.birthday)}
            skillCan={getSkillName(skills, user.idSkill)}
            skillWant={getCategoryNames(categories, user.favoriteCategories)}
            bio={user.bio}
            domains={domains}
            isLiked={likedUserIds.includes(user.id)}
            isOfferSent={sentOfferUserIds.includes(user.id)}
            onLikeClick={onLikeClick ? () => onLikeClick(user.id) : undefined}
            onDetailsClick={
              onDetailsClick ? () => onDetailsClick(user.id) : undefined
            }
          />
        ))}
      </div>
    </section>
  );
};
