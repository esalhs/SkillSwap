import { useState, Fragment } from 'react';
import styles from './CardSection.module.css';
import { CardUser } from '../CardUser';
import { Button } from '@/shared/ui/Button';

export type User = {
  id: string;
  avatarUrl: string | null;
  name: string;
  location: string;
  age: number;
  skillCan: string;
  skillWant: string[];
  bio?: string;
};

type CardSectionProps = {
  title: string;
  users: User[];
  likedUserIds?: string[];
  sentOfferUserIds?: string[];
  onLikeClick?: (userId: string) => void;
  onDetailsClick?: (userId: string) => void;
};

export const CardSection = ({
  title,
  users,
  likedUserIds = [],
  sentOfferUserIds = [],
  onLikeClick,
  onDetailsClick,
}: CardSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleUsers = isExpanded ? users : users.slice(0, 3);
  const hasMore = users.length > 3;

  const handleToggle = () => setIsExpanded((prev: boolean) => !prev);

  return (
    <section className={styles.section}>
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
          <Fragment key={user.id}>
            <CardUser
              avatarUrl={user.avatarUrl}
              name={user.name}
              location={user.location}
              age={user.age}
              skillCan={user.skillCan}
              skillWant={user.skillWant}
              bio={user.bio}
              isLiked={likedUserIds.includes(user.id)}
              isOfferSent={sentOfferUserIds.includes(user.id)}
              onLikeClick={onLikeClick ? () => onLikeClick(user.id) : undefined}
              onDetailsClick={
                onDetailsClick ? () => onDetailsClick(user.id) : undefined
              }
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
};
