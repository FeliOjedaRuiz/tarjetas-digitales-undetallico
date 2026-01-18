import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', isDestructive = false }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
			<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200 border border-slate-100">
				<h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
				<p className="text-slate-600 mb-6">{message}</p>
				
				<div className="flex justify-end gap-3">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
					>
						{cancelText}
					</button>
					<button
						onClick={() => {
							onConfirm();
							onClose();
						}}
						className={`px-4 py-2 rounded-lg text-white font-bold shadow-md transition-transform active:scale-95 ${
							isDestructive 
								? 'bg-red-500 hover:bg-red-600 shadow-red-100' 
								: 'bg-brand-pink hover:bg-pink-600 shadow-pink-100'
						}`}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;