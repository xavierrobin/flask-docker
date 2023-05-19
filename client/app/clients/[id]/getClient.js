'use client'
import {entrypointServer} from '../../../config/entrypoint';

export default async function getClientById(id) {
  const res = await fetch(`${entrypointServer}/clients/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
