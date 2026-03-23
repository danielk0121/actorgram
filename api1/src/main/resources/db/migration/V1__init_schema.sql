CREATE TABLE actor (
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    name          VARCHAR(100) NOT NULL COMMENT '배우 이름',
    birth_year    INT          NOT NULL COMMENT '출생 연도',
    nationality   VARCHAR(50)  NOT NULL COMMENT '국적',
    debut_date    DATE         NOT NULL COMMENT '데뷔일',
    gender        VARCHAR(10)  NULL     COMMENT '''남'' 또는 ''여''',
    profile_image VARCHAR(500) NULL     COMMENT '프로필 이미지 URL',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='배우';

CREATE TABLE movie (
    id           BIGINT       NOT NULL AUTO_INCREMENT,
    title        VARCHAR(200) NOT NULL COMMENT '작품 제목',
    year         INT          NOT NULL COMMENT '개봉 연도',
    genre        VARCHAR(100) NOT NULL COMMENT '장르',
    overview     TEXT         NOT NULL COMMENT '줄거리',
    director     VARCHAR(100) NOT NULL COMMENT '감독',
    writer       VARCHAR(100) NOT NULL COMMENT '작가(각본가)',
    age_rating   VARCHAR(20)  NOT NULL COMMENT '관람등급',
    runtime      INT          NOT NULL COMMENT '상영시간 (분)',
    release_date DATE         NOT NULL COMMENT '개봉일',
    country      VARCHAR(50)  NOT NULL COMMENT '제작국가',
    poster_url   VARCHAR(500) NULL     COMMENT '포스터 이미지 URL',
    format       VARCHAR(20)  NOT NULL COMMENT '''단편'' 또는 ''시리즈''',
    episode      INT          NULL     COMMENT '시리즈 총 에피소드 수',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='작품';

CREATE TABLE cast_entry (
    id                 BIGINT       NOT NULL AUTO_INCREMENT,
    movie_id           BIGINT       NOT NULL COMMENT '출연 작품 참조',
    actor_id           BIGINT       NOT NULL COMMENT '출연 배우 참조',
    role               VARCHAR(100) NOT NULL COMMENT '배역명',
    is_main            TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '주연 여부',
    role_profile_image VARCHAR(500) NULL     COMMENT '배역 대표 이미지 URL',
    PRIMARY KEY (id),
    CONSTRAINT fk_cast_entry_movie FOREIGN KEY (movie_id) REFERENCES movie (id),
    CONSTRAINT fk_cast_entry_actor FOREIGN KEY (actor_id) REFERENCES actor (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='출연 정보';

CREATE TABLE actor_stats (
    actor_id    BIGINT NOT NULL COMMENT '배우 참조 (1:1)',
    movie_count INT    NOT NULL DEFAULT 0 COMMENT '출연 작품 수',
    PRIMARY KEY (actor_id),
    CONSTRAINT fk_actor_stats_actor FOREIGN KEY (actor_id) REFERENCES actor (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='배우 통계';

CREATE TABLE role_image (
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    cast_entry_id BIGINT       NOT NULL COMMENT '출연 정보 참조',
    url           VARCHAR(500) NOT NULL COMMENT '이미지 URL',
    seq           INT          NOT NULL COMMENT '표시 순서',
    PRIMARY KEY (id),
    CONSTRAINT fk_role_image_cast_entry FOREIGN KEY (cast_entry_id) REFERENCES cast_entry (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='배역 이미지';
