export enum ContactSubject {
  GENERAL_FEEDBACK = 'GENERAL_FEEDBACK',
  SUGGESTION = 'SUGGESTION',
  BUG_REPORT = 'BUG_REPORT',
  IMPROVEMENT = 'IMPROVEMENT',
  PARTNERSHIP_REQUEST = 'PARTNERSHIP_REQUEST',
  CONTENT_SUGGESTION = 'CONTENT_SUGGESTION',
  OTHER = 'OTHER',
}

export const ContactSubjectLabels: Record<ContactSubject, string> = {
  [ContactSubject.GENERAL_FEEDBACK]: 'Commentaire général',
  [ContactSubject.SUGGESTION]: 'Suggestion',
  [ContactSubject.BUG_REPORT]: 'Signalement de bug',
  [ContactSubject.IMPROVEMENT]: "Demande d'amélioration",
  [ContactSubject.PARTNERSHIP_REQUEST]: 'Demande de partenariat',
  [ContactSubject.CONTENT_SUGGESTION]: 'Suggestion de contenu',
  [ContactSubject.OTHER]: 'Autre',
};
