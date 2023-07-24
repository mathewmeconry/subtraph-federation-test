import {BigInt, store} from '@graphprotocol/graph-ts';

import {
  MetadataSet,
  Executed,
  Granted,
  Revoked,
  TrustedForwarderSet,
  SignatureValidatorSet,
  StandardCallbackRegistered,
  NewURI
} from '../../generated/templates/DaoTemplateV1_0_0/DAO';
import {
  Dao
} from '../../generated/schema';

export function handleMetadataSet(event: MetadataSet): void {
  let daoId = event.address.toHexString();
  let metadata = event.params.metadata.toString();
  _handleMetadataSet(daoId, metadata);
}

export function _handleMetadataSet(daoId: string, metadata: string): void {
  let entity = Dao.load(daoId);
  if (entity) {
    entity.metadata = metadata;
    entity.save();
  }
}


export function handleTrustedForwarderSet(event: TrustedForwarderSet): void {
  let daoId = event.address.toHexString();
  let entity = Dao.load(daoId);
  if (entity) {
    entity.trustedForwarder = event.params.forwarder;
    entity.save();
  }
}

export function handleSignatureValidatorSet(
  event: SignatureValidatorSet
): void {
  let daoId = event.address.toHexString();
  let entity = Dao.load(daoId);
  if (entity) {
    entity.signatureValidator = event.params.signatureValidator;
    entity.save();
  }
}

export function handleNewURI(event: NewURI): void {
  let daoId = event.address.toHexString();
  let entity = Dao.load(daoId);
  if (entity) {
    entity.daoURI = event.params.daoURI;
    entity.save();
  }
}
